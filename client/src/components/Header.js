import React from "react";
import logo from "./logo.png";
import { useHistory } from "react-router-dom";
import { useWeb3Modal } from '@web3modal/react';
import { useAccount } from 'wagmi';
import "./styles/headerStyle.css";

export default function Header(props) {
    const history = useHistory();
    const { open, close } = useWeb3Modal()
    const { address, isConnecting, isDisconnected } = useAccount()
    return (
        <div id="header" >
            <div id="logoName" onClick={() => history.push("/")}>
                <img id="logo" src={logo}></img>
                <div id="headerTitle">trusted fund</div>
            </div>
            <div id="btnRight">
                {!address ?
                    <div id="connectBtn" onClick={() => open()}>
                        connect
                    </div>
                    :
                    <div id="createBtn" onClick={() => history.push("/create")}>
                        create
                    </div>
                }
            </div>
        </div>
    );
}