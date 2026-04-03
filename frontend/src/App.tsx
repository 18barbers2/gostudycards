import { Routes, Route} from "react-router-dom";
import NavBar from './components/NavBar.tsx';
import CardBuilder from './pages/CardBuilder.tsx';
import AddCard from './pages/AddCard.tsx';
import Decks from './pages/Decks.tsx';
import DeckDetail from './pages/DeckDetail.tsx';
import Home from './pages/Home.tsx';
import Study from './pages/Study.tsx';
import Login from "./pages/Login.tsx";
import { AuthProvider } from "./context/AuthContext.tsx";

function App() {

  return (
    <div className="app">
      <AuthProvider>
        <NavBar/>
        <Routes>
          <Route path="/" element={<Home></Home>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/add-card" element={<AddCard/>}/>
          <Route path="/card-builder" element={<CardBuilder/>}/>
          <Route path="/decks" element={<Decks/>}/>
          <Route path="/decks/:deckId" element={<DeckDetail/>}/>
          <Route path="/study" element={<Study/>}/>
        </Routes>
      </AuthProvider>

    </div>
  );
}

export default App
