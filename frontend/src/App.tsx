import { Routes, Route} from "react-router-dom";
import NavBar from './components/NavBar.tsx';
import CardBuilder from './pages/CardBuilder.tsx';
import AddCard from './pages/AddCard.tsx';

function App() {

  return (
    <div className="app">
      <NavBar/>

      <Routes>
        <Route path="/" element={<div><h2>Home Page</h2></div>}/>
        <Route path="/add-card" element={<AddCard/>}/>
        <Route path="/card-builder" element={<CardBuilder/>}/>
      </Routes>

    </div>
  );
}

export default App
