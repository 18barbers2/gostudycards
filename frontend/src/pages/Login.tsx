import { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../css/Login.css'
import { useAuth } from "../context/AuthContext";
import { initGuestSession } from "../services/guestStorage";
import { post } from "../api/client";


export default function Login() {

    const { login, loginAsGuest } = useAuth();

    const navigate = useNavigate();

    const [mode, setMode] = useState<'login' | 'register'>('login');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleGuest = () =>  {
        // Wire to loginAsGuest() later
        initGuestSession();
        loginAsGuest();
        navigate('/');

    };

    const toggleMode = () => {
        setMode(prev => (prev === 'login' ? 'register' : 'login'));
        setError(null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        console.log(import.meta.env.VITE_API_URL)
        e.preventDefault();
        setError(null);
        setLoading(true);
        try {
            const data = mode === 'login'
                ? await post('/api/auth/login', { email, password })
                : await post('/api/auth/register', { email, username, password });
            login(data);
            navigate('/');
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-bg">
            <div className="login-card">
                <h1 className="login-title">GoStudyCards</h1>
                <p className="login-subtitle">Your spaced repetition study companion.</p>
                <form className="login-form" onSubmit={handleSubmit}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        autoComplete="email"
                    />
                    {mode === 'register' && (
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                            autoComplete="username"
                        />
                    )}
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
                    />

                    {error && <p className="login-error">{error}</p>}

                    <button
                        type="submit"
                        className="login-button login-button--primary"
                        disabled={loading}
                    >
                        {loading
                            ? 'Please wait…'
                            : mode === 'login' ? 'Sign In' : 'Create account'}
                    </button>
                </form>

                <div className="login-divider">
                    <span className="login-divider-line"/>
                    <span className="login-divider-text">or</span>
                    <span className="login-divider-line"/>
                </div>

                <button className="login-button login-button--ghost" onClick={handleGuest}>Continue as Guest</button>

                <p className="login-note">
                    {mode === 'login'
                        ? <>Need an account? <span onClick={toggleMode}>Create one</span></>
                        : <>Already have an account? <span onClick={toggleMode}>Sign in</span></>}
                </p>
            </div>
        </div>
    )

}
