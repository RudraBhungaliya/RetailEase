import { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // Check for stored user on mount
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const login = (email, password) => {
        // Mock login logic
        console.log("Logging in:", email);
        const mockUser = { email, name: email.split("@")[0] };
        setUser(mockUser);
        localStorage.setItem("user", JSON.stringify(mockUser));
        return true;
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("user");
    };

    const signUp = (name, email, password) => {
        // Mock signup logic
        console.log("Signing up:", name, email);
        const mockUser = { email, name };
        setUser(mockUser);
        localStorage.setItem("user", JSON.stringify(mockUser));
        return true;
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, signUp }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
