import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import AuthProvider from './context/AuthContext';
import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum'
import { Web3Modal } from '@web3modal/react'
import { configureChains, createConfig, WagmiConfig } from 'wagmi'
import { arbitrum, mainnet, polygon } from 'wagmi/chains'
import "./index.css";

const chains = [mainnet]
const projectId = 'bc89bdb6aff46b29be41d26b8a9da13f'

const { publicClient } = configureChains(chains, [w3mProvider({ projectId })])
const wagmiConfig = createConfig({
    autoConnect: true,
    connectors: w3mConnectors({ projectId, chains }),
    publicClient
})
const ethereumClient = new EthereumClient(wagmiConfig, chains)

ReactDOM.render(
    <WagmiConfig config={wagmiConfig}>
        <AuthProvider>
            <App />
            <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
        </AuthProvider>
    </WagmiConfig>,
    document.getElementById('root'));
