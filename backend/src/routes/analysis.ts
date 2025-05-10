import express from 'express';
import { prisma } from '../lib/db';
import { authenticateToken } from '../middleware/auth';
import axios from 'axios';

export const analysisRoutes = express.Router();

// Career recommendation based on user profile
analysisRoutes.post('/analyze', authenticateToken, async (req, res) => {
  try {
    const userId = (req as any).user.id;
    const {
      academicHistory,
      interests,
      personality,
      careerGoals
    } = req.body;

    // Save the user's profile data
    const userProfile = await prisma.userProfile.upsert({
      where: { userId },
      update: {
        academicHistory: JSON.stringify(academicHistory),
        interests: JSON.stringify(interests),
        personality: JSON.stringify(personality),
        careerGoals: JSON.stringify(careerGoals),
      },
      create: {
        userId,
        academicHistory: JSON.stringify(academicHistory),
        interests: JSON.stringify(interests),
        personality: JSON.stringify(personality),
        careerGoals: JSON.stringify(careerGoals),
      },
    });

    // Send data to Python ML service
    const mlServiceUrl = process.env.ML_SERVICE_URL || 'http://localhost:5000';
    const response = await axios.post(`${mlServiceUrl}/analyze`, {
      academicHistory,
      interests,
      personality,
      careerGoals
    });

    const recommendations = response.data.recommendations;

    // Save the recommendations
    await prisma.recommendation.create({
      data: {
        userId,
        recommendations: JSON.stringify(recommendations),
      },
    });

    res.json({
      success: true,
      recommendations,
    });
  } catch (error) {
    console.error('Error in analysis:', error);
    res.status(500).json({ error: 'Failed to analyze profile' });
  }
});

// Helper function to generate career recommendations
async function generateCareerRecommendations(
  academicHistory: any,
  interests: any,
  personality: any,
  careerGoals: any
) {
  // Get all careers from the database
  const careers = await prisma.career.findMany();

  // Simple scoring system based on matching criteria
  const scoredCareers = careers.map(career => {
    let score = 0;

    // Match education level
    if (career.requirements.includes(academicHistory.highestEducation)) {
      score += 2;
    }

    // Match interests
    const userInterests = [
      ...interests.technical.split(','),
      ...interests.creative.split(','),
      ...interests.social.split(','),
      ...interests.analytical.split(',')
    ].map(i => i.trim().toLowerCase());

    const careerKeywords = career.description.toLowerCase().split(' ');
    const matchingInterests = userInterests.filter(interest => 
      careerKeywords.some(keyword => keyword.includes(interest))
    );
    score += matchingInterests.length;

    // Match personality traits
    const userTraits = personality.traits.split(',').map(t => t.trim().toLowerCase());
    const matchingTraits = userTraits.filter(trait => 
      careerKeywords.some(keyword => keyword.includes(trait))
    );
    score += matchingTraits.length;

    // Match career goals
    const userGoals = [
      careerGoals.shortTerm,
      careerGoals.longTerm,
      careerGoals.preferredIndustries
    ].join(' ').toLowerCase();

    const matchingGoals = careerKeywords.filter(keyword => 
      userGoals.includes(keyword)
    );
    score += matchingGoals.length;

    return {
      ...career,
      matchScore: score,
      matchPercentage: Math.min(100, (score / 10) * 100),
    };
  });

  // Sort by match score and return top 5 recommendations
  return scoredCareers
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, 5);
} 