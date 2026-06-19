import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import deckRoutes from './routes/decks.js'
import cardRoutes from './routes/cards.js'
import templateRoutes from './routes/templates.js'
import reviewLogRoutes from './routes/review-logs.js'
import authRoutes from './routes/auth.js'
import { requireAuth } from './middleware/auth.js'

const app = express()
app.use(cors({
    origin: process.env.ALLOWED_ORIGIN || 'http://localhost:5173'
  }
))
app.use(express.json())
app.use('/api/auth', authRoutes)
app.use('/api/decks', requireAuth, deckRoutes)
app.use('/api/cards', requireAuth, cardRoutes)
app.use('/api/templates', requireAuth, templateRoutes)
app.use('/api/review-logs', requireAuth, reviewLogRoutes)

// Health check route — confirms server is running
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));