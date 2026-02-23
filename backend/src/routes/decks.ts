import { Router } from 'express'
import prisma from '../lib/prisma.js'


const router = Router()

// Get all decks for a user
router.get('/', async (req, res) => {

    const { userId } = req.query;
    const decks = await prisma.deck.findMany({
        where: { ownerId: String(userId) },
        include: { _count: { select: { cards: true } } }
    });
    res.json(decks);
}) 

// GET a single deck by id
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const deck = await prisma.deck.findUnique({ where: { id } });
    if (!deck) { res.status(404).json({ error: 'Deck not found' }); return; }
    res.json(deck);
});

// POST create a new deck
router.post('/', async (req, res) => {
    const { name, description, ownerId } = req.body;
    const deck = await prisma.deck.create({
        data: { name, description, ownerId }
    });
    res.json(deck);
});

// DELETE a deck
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    await prisma.deck.delete({ where: { id } });
    res.status(204).send();
});

export default router