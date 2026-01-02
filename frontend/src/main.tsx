import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import CardBuilder from './pages/CardBuilder.tsx';
import NavBar from './components/NavBar.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* <App /> */}
    <NavBar></NavBar>
    <CardBuilder />
  </StrictMode>,
)
