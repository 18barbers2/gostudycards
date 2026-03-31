import { useNavigate } from "react-router-dom";


export default function Login() {
    const navigate = useNavigate();

    const handleGuest = () =>  {
        navigate('/');
    }

    const handleLogin = () => {
        navigate('/');
    }

    
}