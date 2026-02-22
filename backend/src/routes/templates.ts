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

// PATCH update the fields of an existing template.
// Accepts the complete desired fields array and replaces the existing ones.
// This is used when the user adds or removes custom fields on the Add Card page.
router.patch('/:id', async (req, res) => {
  const { id } = req.params
  const { fields } = req.body // Array<{ name: string; isDefault: boolean }>
  const template = await prisma.cardTemplate.update({
    where: { id },
    data: {
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