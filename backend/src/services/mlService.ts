import { prisma } from '../lib/db';
import natural from 'natural';
import { Career } from '@prisma/client';

// Initialize NLP tools
const tokenizer = new natural.WordTokenizer();
const TfIdf = natural.TfIdf;

interface UserProfile {
  academicHistory: {
    highestEducation: string;
    major: string;
    gpa: string;
    relevantCourses: string;
  };
  interests: {
    technical: string;
    creative: string;
    social: string;
    analytical: string;
  };
  personality: {
    traits: string;
    strengths: string;
    weaknesses: string;
    workStyle: string;
  };
  careerGoals: {
    shortTerm: string;
    longTerm: string;
    preferredIndustries: string;
    desiredSalary: string;
  };
}

export class MLService {
  private tfidf: natural.TfIdf;
  private careers: Career[];

  constructor() {
    this.tfidf = new TfIdf();
  }

  async initialize() {
    // Load all careers from the database
    this.careers = await prisma.career.findMany();
    
    // Add career descriptions to TF-IDF
    this.careers.forEach(career => {
      this.tfidf.addDocument(
        `${career.title} ${career.description} ${career.requirements.join(' ')}`
      );
    });
  }

  async analyzeProfile(profile: UserProfile) {
    // Create a document from user profile
    const userDocument = this.createUserDocument(profile);
    
    // Calculate similarity scores
    const scores = this.calculateSimilarityScores(userDocument);
    
    // Get top recommendations
    const recommendations = this.getTopRecommendations(scores);
    
    return recommendations;
  }

  private createUserDocument(profile: UserProfile): string {
    return `
      Education: ${profile.academicHistory.highestEducation} in ${profile.academicHistory.major}
      Courses: ${profile.academicHistory.relevantCourses}
      Interests: ${Object.values(profile.interests).join(' ')}
      Personality: ${profile.personality.traits} ${profile.personality.strengths}
      Work Style: ${profile.personality.workStyle}
      Goals: ${profile.careerGoals.shortTerm} ${profile.careerGoals.longTerm}
      Industries: ${profile.careerGoals.preferredIndustries}
    `.toLowerCase();
  }

  private calculateSimilarityScores(userDocument: string): { career: Career; score: number }[] {
    const scores = this.careers.map(career => {
      const careerDocument = `${career.title} ${career.description} ${career.requirements.join(' ')}`;
      
      // Calculate TF-IDF similarity
      let score = 0;
      this.tfidf.tfidfs(userDocument, (i, measure) => {
        if (i === this.careers.indexOf(career)) {
          score = measure;
        }
      });

      // Add bonus points for education level match
      if (career.requirements.includes(userDocument.match(/education: (.*?) in/)?.[1] || '')) {
        score += 0.5;
      }

      // Add bonus points for industry match
      const preferredIndustries = userDocument.match(/industries: (.*?)$/)?.[1] || '';
      if (career.description.toLowerCase().includes(preferredIndustries)) {
        score += 0.3;
      }

      return { career, score };
    });

    return scores;
  }

  private getTopRecommendations(scores: { career: Career; score: number }[]) {
    return scores
      .sort((a, b) => b.score - a.score)
      .slice(0, 5)
      .map(item => ({
        ...item.career,
        matchScore: item.score,
        matchPercentage: Math.min(100, (item.score / 2) * 100),
      }));
  }
} 