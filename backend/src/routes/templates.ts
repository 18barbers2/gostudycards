import { Router } from 'express'
import prisma from '../lib/prisma.js'

const router = Router()

// GET template for a deck
router.get('/', async (req, res) => {
  const { deckId } = req.query
  const template = await prisma.cardTemplate.findUnique({
    where: { deckId: String(deckId) },
    include: { fields: true }
  })
  res.json(template)
})

// POST create a template
router.post('/', async (req, res) => {
  const { deckId, ownerId, frontTemplate, backTemplate, style, fields } = req.body
  const template = await prisma.cardTemplate.create({
    data: {
      deckId, ownerId, frontTemplate, backTemplate, style,
      fields: { create: fields }
    },
    include: { fields: true }
  })
  res.json(template)
})

export default router