import React, { createContext, useState, useEffect } from 'react';
import axios from "axios";
import { useWeb3Modal } from '@web3modal/react';
import { useAccount } from 'wagmi';
import AuthService from '../services/AuthService';

export const AuthContext = createContext();

export default ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const { address, isConnecting, isDisconnected } = useAccount();

    async function getUserData(address) {
        try {
            const { data } = await axios.post("/user/get-user-data", { address: address });
            console.log(data);
            if (data.user) {
                setUser(data.user);
                setIsAuthenticated(true);
            } else {
                setUser(null)
            }
            setIsLoaded(true);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (address) {
            console.log(address);
            getUserData(address);
        }
    }, [address]);

    return (
        <div>
            {!isLoaded ? <div> </div> :
                <AuthContext.Provider value={{ user, setUser, isAuthenticated, setIsAuthenticated }}>
                    {children}
                </AuthContext.Provider>}
        </div>
    )
}