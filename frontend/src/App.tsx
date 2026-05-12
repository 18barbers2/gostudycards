import { Routes, Route, Navigate, useLocation} from "react-router-dom";
import NavBar from './components/NavBar.tsx';
import CardBuilder from './pages/CardBuilder.tsx';
import AddCard from './pages/AddCard.tsx';
import Decks from './pages/Decks.tsx';
import DeckDetail from './pages/DeckDetail.tsx';
import Home from './pages/Home.tsx';
import Study from './pages/Study.tsx';
import Login from "./pages/Login.tsx";
import { AuthProvider } from "./context/AuthContext.tsx";
import ProtectedRoute from "./components/ProtectedRoute.tsx";

function AppLayout() {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';

  return (
    <div className="app">
      {!isLoginPage && <NavBar/>}
      <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path="/" element={<ProtectedRoute><Home/></ProtectedRoute>}/>
        <Route path="/add-card" element={<ProtectedRoute><AddCard/></ProtectedRoute>}/>
        <Route path="/card-builder" element={<ProtectedRoute><CardBuilder/></ProtectedRoute>}/>
        <Route path="/decks" element={<ProtectedRoute><Decks/></ProtectedRoute>}/>
        <Route path="/decks/:deckId" element={<ProtectedRoute><DeckDetail/></ProtectedRoute>}/>
        <Route path="/study" element={<ProtectedRoute><Study/></ProtectedRoute>}/>
        <Route path="*" element={<Navigate to="/login" replace/>}/>
      </Routes>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppLayout/>
    </AuthProvider>
  );
}

export default App
