import React, { useEffect } from "react";
import { useWeb3Modal } from '@web3modal/react';
import { useAccount } from 'wagmi';
import "./homeStyle.css";

export default function Home() {
  const { open, close } = useWeb3Modal()
  const { address, isConnecting, isDisconnected } = useAccount()

  useEffect(() => {
    if (address) {
      console.log(address);
    }
  }, [address]);

  return (
    <div onClick={() => open()}>
      connect
    </div>
  );
}
