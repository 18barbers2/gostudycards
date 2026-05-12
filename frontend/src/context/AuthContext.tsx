import { createContext, useContext, useState } from "react";

interface AuthContextType {
    isAuthenticated: boolean;
    isGuest: boolean;
    login: () => void;
    loginAsGuest: () => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
    isAuthenticated: false,
    isGuest: false,
    login: () => {},
    loginAsGuest: () => {},
    logout: () => {},
});


export function AuthProvider({ children } : any ) {

    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        return localStorage.getItem('isAuthenticated') === 'true'
    });

    const [isGuest, setIsGuest] = useState(() => {
        return localStorage.getItem('isGuest') === 'true'
    });

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