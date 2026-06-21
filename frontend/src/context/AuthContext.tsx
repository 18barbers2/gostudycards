import { createContext, useContext, useState } from "react";
import { clearGuestData } from "../services/guestStorage";


type LoginData = {token: string, userId: string, username: string};

interface AuthContextType {
    isAuthenticated: boolean;
    isGuest: boolean;
    token: string | null;
    userId: string | null;
    username: string | null;
    login: (_data: LoginData) => void;
    loginAsGuest: () => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
    isAuthenticated: false,
    isGuest: false,
    token: null,
    userId: null,
    username: null,
    login: (_data: LoginData) => {},
    loginAsGuest: () => {},
    logout: () => {},
});


export function AuthProvider({ children } : any ) {

    const [isAuthenticated, setIsAuthenticated] = useState(() => localStorage.getItem('isAuthenticated') === 'true');
    const [isGuest, setIsGuest] = useState(() => localStorage.getItem('isGuest') === 'true');

    const [token, setToken] = useState(() => localStorage.getItem('token'));
    const [userId, setUserId] = useState(() => localStorage.getItem('userId'));
    const [username, setUsername] = useState(() => localStorage.getItem('username'));


    const login = (data: {token: string, userId: string, username: string}) => {
        setIsAuthenticated(true);
        setIsGuest(false);
        setToken(data.token);
        setUserId(data.userId);
        setUsername(data.username);
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('isGuest', 'false');
        localStorage.setItem('token', data.token);
        localStorage.setItem('userId', data.userId);
        localStorage.setItem('username', data.username);
    };

    const loginAsGuest = () => {
        setIsAuthenticated(true);
        setIsGuest(true);
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('isGuest', 'true')
    };

    const logout = () => {
        setIsAuthenticated(false);
        setIsGuest(false);
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('isGuest');
        localStorage.removeItem('token')
        localStorage.removeItem('username')
        localStorage.removeItem('userId')
        clearGuestData();
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, isGuest, token, userId, username, login, loginAsGuest, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}