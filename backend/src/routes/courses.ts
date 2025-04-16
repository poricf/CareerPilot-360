import express from 'express';
import { prisma } from '../lib/db';
import { authenticateToken } from '../middleware/auth';

export const courseRoutes = express.Router();

// Get all courses
courseRoutes.get('/', async (req, res) => {
  try {
    const courses = await prisma.course.findMany();
    res.json(courses);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch courses' });
  }
});

// Get course by ID
courseRoutes.get('/:id', async (req, res) => {
  try {
    const course = await prisma.course.findUnique({
      where: { id: req.params.id },
    });

    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }

    res.json(course);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch course' });
  }
});

// Create course (protected route)
courseRoutes.post('/', authenticateToken, async (req, res) => {
  try {
    const { title, description, duration, level } = req.body;

    const course = await prisma.course.create({
      data: {
        title,
        description,
        duration,
        level,
      },
    });

    res.status(201).json(course);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create course' });
  }
});

// Update course (protected route)
courseRoutes.put('/:id', authenticateToken, async (req, res) => {
  try {
    const { title, description, duration, level } = req.body;

    const course = await prisma.course.update({
      where: { id: req.params.id },
      data: {
        title,
        description,
        duration,
        level,
      },
    });

    res.json(course);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update course' });
  }
});

// Delete course (protected route)
courseRoutes.delete('/:id', authenticateToken, async (req, res) => {
  try {
    await prisma.course.delete({
      where: { id: req.params.id },
    });

    res.json({ message: 'Course deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete course' });
  }
}); 