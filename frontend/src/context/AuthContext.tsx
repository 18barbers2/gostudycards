import { createContext, useContext, useState } from "react";
import { clearGuestData } from "../services/guestStorage";

interface AuthContextType {
    isAuthenticated: boolean;
    isGuest: boolean;
    token: string | null;
    userId: string | null;
    username: string | null;
    login: () => void;
    loginAsGuest: () => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
    isAuthenticated: false,
    isGuest: false,
    token: null,
    userId: null,
    username: null,
    login: () => {},
    loginAsGuest: () => {},
    logout: () => {},
});


export function AuthProvider({ children } : any ) {

    const [isAuthenticated, setIsAuthenticated] = useState(() => localStorage.getItem('isAuthenticated') === 'true');
    const [isGuest, setIsGuest] = useState(() => localStorage.getItem('isGuest') === 'true');

    const [token, setToken] = useState(() => localStorage.getItem('token'));
    const [userId, setUserId] = useState(() => localStorage.getItem('userId'));
    const [username, setUsername] = useState(() => localStorage.getItem('username'));


    const login = () => {
        setIsAuthenticated(true);
        setIsGuest(false);
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('isGuest', 'false')
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
        clearGuestData();
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, isGuest, login, loginAsGuest, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}