"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButtonDynamic, WalletDisconnectButtonDynamic } from "@/components/dynamic/wallet_buttons"
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import InformationDialog from "@/components/information_dialog";
import { DialogContentType } from "./sign_message/page";

export default function Home() {
    const toast = useToast();
    const wallet = useWallet();
    const { connection } = useConnection();
    const [pubKey, setPubKey] = useState<string | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
    const [dialogContent, setDialogContent] = useState<DialogContentType | null>();
    const [transferSuccessfull, setTransferSuccessfull] = useState<boolean>(false);

    const openDialog = () => setIsDialogOpen(true);
    const closeDialog = () => setIsDialogOpen(false);

    const handleBalance = async () => {
        if (wallet.connected && wallet.publicKey) {
            await connection.getBalance(wallet.publicKey)
                .then((balance) => {
                    setDialogContent({
                        title: `SOL Balance ${balance / LAMPORTS_PER_SOL} :)`,
                        description: `SOL Balance: ${balance / LAMPORTS_PER_SOL} is available in your account with Public Key: ${pubKey}`
                    });
                    setTransferSuccessfull(true);
                    openDialog();
                })
                .catch(() => {
                    setDialogContent({
                        title: "UhOh :( Balance Fetch Failed",
                        description: `May be due to any server / api / network error we were not able to fetch your SOL Balance of your account with Public Key: ${pubKey}`
                    });
                    setTransferSuccessfull(false);
                    openDialog();
                });
        } else {
            toast.toast({
                title: "Check Wallet Connection",
                description: `Check if your wallet is connected or not before checking for balance !!`,
            })
        }
    }

    useEffect(() => {
        setTimeout(() => toast.toast({
            title: "Wallet Connected :)",
            description: `Wallet Connected Public Key: ${pubKey}`,
        }), 500)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [wallet.connected && pubKey])

    useEffect(() => {
        setTimeout(() => toast.toast({
            title: "Wallet Disconnecting :(",
            description: `Click on Connect or Select Wallet to Reconnect`,
        }), 500)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [wallet.disconnecting])

    useEffect(() => {
        if (wallet.publicKey) {
            setPubKey(wallet.publicKey.toString());
        }
    }, [wallet.publicKey])

    return (
        <Card className="w-full max-w-sm">
            <CardHeader>
                <CardTitle className="text-2xl w-full flex flex-row justify-between items-center">
                    Wallet Options
                </CardTitle>
                <CardDescription>
                    Connect and get your job done
                </CardDescription>
            </CardHeader>
            <CardContent className="grid grid-flow-cols grid-cols-1 gap-4">
                <div className="w-full p-4 border rounded-sm grid grid-cols-1 grid-flow-cols gap-4">
                    <WalletMultiButtonDynamic />
                    <WalletDisconnectButtonDynamic />
                </div>
                <div className="grid gap-2" aria-disabled>
                    <Label htmlFor="solAmount">Public Key</Label>
                    <Input id="publicKey" type="publicKey" placeholder="Public Key" value={pubKey ?? ""} disabled />
                </div>
                <div className="grid grid-flow-cols grid-cols-1 gap-4">
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger disabled>
                                <Button asChild={true} className={"w-full"}>
                                    <Link href={"/sol_faucet"}>
                                        SOL Faucet
                                    </Link>
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Under Development</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                    <Button asChild={true} className={"w-full"}>
                        <Link href={"/request_airdrop"}>
                            Request Airdrop
                        </Link>
                    </Button>
                    <Button asChild={true} className={"w-full"}>
                        <Link href={"/send_token"}>
                            Send Token
                        </Link>
                    </Button>
                    <Button asChild={true} className={"w-full"}>
                        <Link href={"/sign_message"}>
                            Sign Message
                        </Link>
                    </Button>
                    <Button className={"w-full"} onClick={handleBalance}>
                        Check Balance
                    </Button>
                </div>
                {dialogContent && <InformationDialog isOpen={isDialogOpen} setIsOpen={setIsDialogOpen} closeAction={closeDialog} content={dialogContent} successTrigger={transferSuccessfull} />}
            </CardContent>
        </Card>
    );
}
