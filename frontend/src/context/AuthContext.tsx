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

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isGuest, setIsGuest] = useState(false);

    const login = () => {
        setIsAuthenticated(true);
        setIsGuest(false);
    };

    const loginAsGuest = () => {
        setIsAuthenticated(true);
        setIsGuest(true);
    };

    const logout = () => {
        setIsAuthenticated(false);
        setIsGuest(false);
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