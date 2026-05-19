import { useEffect } from "react";
import { createContext, useContext, useState } from "react";
import { getCurrentUser } from "../services/authService.js";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const fetchUser = async () => {

            try {

                const userData = await getCurrentUser();

                setUser(userData);

            } catch (error) {

                setUser(null);

            } finally {
                setLoading(false);
            }
        };

        fetchUser();

    }, [])

    return (
        <AuthContext.Provider
            value={{ user, setUser, loading }}
        >
            {children}

        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
}