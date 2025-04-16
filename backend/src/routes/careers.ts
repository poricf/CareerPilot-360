import express from 'express';
import { prisma } from '../lib/db';
import { authenticateToken } from '../middleware/auth';

export const careerRoutes = express.Router();

// Get all careers
careerRoutes.get('/', async (req, res) => {
  try {
    const careers = await prisma.career.findMany();
    res.json(careers);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch careers' });
  }
});

// Get career by ID
careerRoutes.get('/:id', async (req, res) => {
  try {
    const career = await prisma.career.findUnique({
      where: { id: req.params.id },
    });

    if (!career) {
      return res.status(404).json({ error: 'Career not found' });
    }

    res.json(career);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch career' });
  }
});

// Create career (protected route)
careerRoutes.post('/', authenticateToken, async (req, res) => {
  try {
    const { title, description, salary, requirements } = req.body;

    const career = await prisma.career.create({
      data: {
        title,
        description,
        salary,
        requirements,
      },
    });

    res.status(201).json(career);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create career' });
  }
});

// Update career (protected route)
careerRoutes.put('/:id', authenticateToken, async (req, res) => {
  try {
    const { title, description, salary, requirements } = req.body;

    const career = await prisma.career.update({
      where: { id: req.params.id },
      data: {
        title,
        description,
        salary,
        requirements,
      },
    });

    res.json(career);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update career' });
  }
});

// Delete career (protected route)
careerRoutes.delete('/:id', authenticateToken, async (req, res) => {
  try {
    await prisma.career.delete({
      where: { id: req.params.id },
    });

    res.json({ message: 'Career deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete career' });
  }
}); 