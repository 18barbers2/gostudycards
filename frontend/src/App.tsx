import { Routes, Route} from "react-router-dom";
import NavBar from './components/NavBar.tsx';
import CardBuilder from './pages/CardBuilder.tsx';
import AddCard from './pages/AddCard.tsx';
import Decks from './pages/Decks.tsx';
import Home from './pages/Home.tsx';

function App() {

  return (
    <div className="app">
      <NavBar/>

      <Routes>
        <Route path="/" element={<Home></Home>}/>
        <Route path="/add-card" element={<AddCard/>}/>
        <Route path="/card-builder" element={<CardBuilder/>}/>
        <Route path="/decks" element={<Decks/>}/>

      </Routes>

    </div>
  );
}

export default App
