import { useNavigate } from "react-router-dom";
import '../css/Login.css'
import { useAuth } from "../context/AuthContext";


export default function Login() {

    const { loginAsGuest } = useAuth();

    const navigate = useNavigate();

    const handleGuest = () =>  {
        // Wire to loginAsGuest() later
        loginAsGuest();
        navigate('/');
    };

    const handleLogin = () => {
        // Wire to loginAsuser() later
        navigate('/');
    };

    return (
        <div className="login-bg">
            <div className="login-card">
                <h1 className="login-title">GoStudyCards</h1>
                <p className="login-subtitle">Your spaced repetition study companion.</p>

                <button className="login-button login-button--primary">Sign In</button>

                <div className="login-divider">
                    <span className="login-divider-line"/>
                    <span className="login-divider-text">or</span>
                    <span className="login-divider-line"/>
                </div>

                <button className="login-button login-button--ghost" onClick={handleLogin}>Continue as Guest</button>

                <p className="login-note">
                    Guest sessions are temporary.{' '}
                    <span>Sign in</span> to save your progress
                </p>
            </div>
        </div>
    )

}