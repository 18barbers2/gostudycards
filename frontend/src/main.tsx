import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import CardBuilder from './pages/CardBuilder.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* <App /> */}
    <CardBuilder />
  </StrictMode>,
)
