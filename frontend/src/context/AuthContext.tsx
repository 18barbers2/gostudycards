import { createContext, useContext, useState } from "react";

const AuthContext = createContext({ isGuest: true, loginAsGuest: () => {}});


export function AuthProvider({ children } : any ) {

    // Set guest state and default to true
    const [isGuest, setIsGuest] = useState(true);
    const loginAsGuest = () => setIsGuest(true);

    return (
        <AuthContext.Provider value= {{ isGuest, loginAsGuest }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}