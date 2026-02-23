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

// PATCH update an existing template.
// Always accepts the complete fields array and replaces existing ones.
// Optionally accepts frontTemplate, backTemplate, and style to update the HTML/CSS
// (used by CardBuilder). If those keys are omitted the HTML/CSS is left unchanged
// (used by AddCard when it only changes field definitions).
router.patch('/:id', async (req, res) => {
  const { id } = req.params
  const { fields, frontTemplate, backTemplate, style } = req.body
  const template = await prisma.cardTemplate.update({
    where: { id },
    data: {
      ...(frontTemplate !== undefined && { frontTemplate }),
      ...(backTemplate  !== undefined && { backTemplate }),
      ...(style         !== undefined && { style }),
      fields: {
        deleteMany: {}, // remove all existing field rows
        create: fields  // recreate with the new list
      }
    },
    include: { fields: true }
  })
  res.json(template)
})

export default router