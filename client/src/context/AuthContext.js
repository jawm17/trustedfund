import React, { createContext, useState, useEffect } from 'react';
import axios from "axios";

export const AuthContext = createContext();

export default ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        getUser();
    }, []);

    async function getUser() {
        try {
            const res = await axios.get("/user/account-info");
            if (res.status === 200) {
                console.log(res.data)
                setUser(res.data.user);
                setIsAuthenticated(true);
                setIsLoaded(true);
            } else {
                setUser(null);
                setIsAuthenticated(false);
                setIsLoaded(true);
            }
        } catch (error) {
            setUser(null);
            setIsAuthenticated(false);
            setIsLoaded(true);
        }
    }

    return (
        <div>
            {!isLoaded ? <h1> </h1> :
                <AuthContext.Provider value={{ user, setUser, isAuthenticated, setIsAuthenticated }}>
                    {children}
                </AuthContext.Provider>}
        </div>
    )
}