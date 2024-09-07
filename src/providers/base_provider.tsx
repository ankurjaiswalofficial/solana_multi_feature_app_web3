"use client";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useMemo } from "react";

//Importing Providers
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
// import { WalletDisconnectButton, WalletMultiButton } from "@solana/wallet-adapter-react-ui";
// import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
// import { clusterApiUrl } from "@solana/web3.js";


//Importing Styles
import "@solana/wallet-adapter-react-ui/styles.css";

function BaseProvider({ children }: Readonly<{ children: React.ReactNode }>) {
    // const network = WalletAdapterNetwork.Devnet;
    // const endpoint = useMemo(() => clusterApiUrl(network), [network])

    // Hardcoded Endpoint
    const endpoint = process.env.SOL_DEVNET_URL ?? "https://api.devnet.solana.com"

    return (
        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={[]} autoConnect={true}>
                <WalletModalProvider>
                    {children}
                </WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    )
}

export default BaseProvider;
