import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import deckRoutes from './routes/decks.js'
import cardRoutes from './routes/cards.js'
import templateRoutes from './routes/templates.js'

dotenv.config()

const app = express()
app.use(cors({
    origin: process.env.ALLOWED_ORIGIN || 'http://localhost:5173'
  }
))
app.use(express.json())
app.use('/api/decks', deckRoutes)
app.use('/api/cards', cardRoutes)
app.use('/api/templates', templateRoutes)

// Health check route — confirms server is running
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));