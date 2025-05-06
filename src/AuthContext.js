import { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem("token") || null);

    const updateToken = (newToken) => {
        localStorage.setItem("token", newToken);
        setToken(newToken);
    };

    const logout = () => {
        localStorage.removeItem("token");
        setToken(null);
    };

    // Handle token expiration
    const checkTokenValidity = () => {
        const storedToken = localStorage.getItem("token");
        if (!storedToken) {
            setToken(null);
            return;
        }

        try {
            const decoded = jwtDecode(storedToken);
            const currentTime = Date.now() / 1000; // seconds
            if (decoded.exp < currentTime) {
                // Token expired
                logout();
            } else {
                setToken(storedToken);
            }
        } catch (error) {
            console.error("Invalid token:", error);
            logout();
        }
    };

    useEffect(() => {
        checkTokenValidity(); // Run once on mount

        const interval = setInterval(checkTokenValidity, 5000); // Check every 5s
        const handleStorageChange = () => checkTokenValidity(); // Sync across tabs

        window.addEventListener("storage", handleStorageChange);
        return () => {
            clearInterval(interval);
            window.removeEventListener("storage", handleStorageChange);
        };
    }, []);

    return (
        <AuthContext.Provider value={{ token, updateToken, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
