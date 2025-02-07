"use client";
import React, { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button"
import {
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useToast } from "@/hooks/use-toast";
import WalletConnectState from "@/components/wallet_connect_state";
import InformationDialog from "@/components/information_dialog";
import { DialogContentType } from "../sign_message/page";

function RequestAirdrop() {
    const toast = useToast();
    const wallet = useWallet();
    const { connection } = useConnection();
    const [pubKey, setPubKey] = useState<string | null>(null);
    const amountRef = useRef<HTMLInputElement | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
    const [dialogContent, setDialogContent] = useState<DialogContentType | null>(null);
    const [transferSuccessfull, setTransferSuccessfull] = useState<boolean>(false);

    const openDialog = () => setIsDialogOpen(true);
    const closeDialog = () => setIsDialogOpen(false);

    const handleAirdrop = async () => {

        if (wallet.connected && wallet.publicKey && amountRef.current) {
            if (Number(amountRef.current?.value) > 0) {
                await connection.requestAirdrop(wallet.publicKey, Number(amountRef.current.value) * LAMPORTS_PER_SOL)
                    .then(() => {
                        setDialogContent({
                            title: "Congrats :) Airdrop Successfull",
                            description: `${amountRef.current?.value} SOL's have been transfer to your wallet having Public Key: ${pubKey}`
                        });
                        setTransferSuccessfull(true);
                        openDialog();
                    })
                    .catch(() => {
                        setDialogContent({
                            title: "UhOh :( Airdrop Failed",
                            description: `May be due to dry faucet or any server / api / network error ${amountRef.current?.value} SOL's weren't transfered to your wallet having Public Key: ${pubKey}`
                        });
                        setTransferSuccessfull(false);
                        openDialog();
                    });
            } else {
                toast.toast({
                    title: "SOL Amount can't be 0",
                    description: "Zero SOL Amount dosen't make sense"
                })
            }
        }
    }

    useEffect(() => {
        if (wallet.publicKey) {
            setPubKey(wallet.publicKey.toString());
        }
    }, [wallet.publicKey])

    return (
        <WalletConnectState active={(wallet.connected && (!!wallet.publicKey)) ?? false}>
            <CardHeader>
                <CardTitle className="text-2xl w-full flex flex-row justify-between items-center">
                    Request Airdrop
                    <Link href={"/"}>
                        <Button variant={"secondary"} size={"sm"}>
                            <ArrowLeftIcon className={"w-4 h-4 mr-2"} />
                            Back
                        </Button>
                    </Link>
                </CardTitle>
                <CardDescription>
                    Enter number of SOL you want <br />
                    <b><em>(maximum 5 allowed)</em></b>
                </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
                <div className="grid gap-2" aria-disabled>
                    <Label htmlFor="solAmount">Public Key</Label>
                    <Input id="publicKey" type="publicKey" placeholder="Public Key" value={pubKey ?? ""} disabled />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="solAmount">SOL Amount</Label>
                    <Input ref={amountRef} id="solAmount" type="number" placeholder="Enter SOL" required max={5} min={0} />
                </div>
            </CardContent>
            <CardFooter>
                <Button className="w-full" onClick={handleAirdrop}>Request</Button>
                {dialogContent && <InformationDialog isOpen={isDialogOpen} setIsOpen={setIsDialogOpen} closeAction={closeDialog} content={dialogContent} successTrigger={transferSuccessfull} />}
            </CardFooter>
        </WalletConnectState>)
}

export default RequestAirdrop;

