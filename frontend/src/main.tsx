import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import CardBuilder from './pages/CardBuilder.tsx';
import NavBar from './components/NavBar.tsx';
import AddCard from './pages/AddCard.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* <App /> */}
    <NavBar></NavBar>
    {/* <CardBuilder /> */}
    <AddCard></AddCard>
  </StrictMode>,
)
