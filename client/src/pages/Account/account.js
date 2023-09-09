import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import "./accountStyle.css";

export default function Account() {
    const { setIsAuthenticated, setUser } = useContext(AuthContext);
    const [username, setUsername] = useState("");

    useEffect(() => {
        getUserInfo();
    }, []);

    async function getUserInfo() {
        try {
            const res = await axios.get("/user/info");
            setUsername(res.data.username);
        } catch (err) {
            console.log(err);
        }
    }

    async function logOutHandler() {
        try {
            const res = await axios.get("/user/logout");
            if(res.data.success) {
                setUser(res.data.user);
                setIsAuthenticated(false);
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div>
            {username}
            <button onClick={() => logOutHandler()}>
                Log Out
            </button>
        </div>
    );
}