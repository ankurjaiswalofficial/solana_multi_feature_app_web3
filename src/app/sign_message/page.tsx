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
import { useToast } from "@/hooks/use-toast";
import { useWallet } from "@solana/wallet-adapter-react";
import WalletConnectState from "@/components/wallet_connect_state";
import { Textarea } from "@/components/ui/textarea";
import { ed25519 } from '@noble/curves/ed25519';
import bs58 from 'bs58';
import InformationDialog from "@/components/information_dialog";

export type DialogContentType = {
    title: string;
    description: string;
}

function SignMessage() {
    const toast = useToast();
    const { publicKey, connected, signMessage } = useWallet();
    const [pubKey, setPubKey] = useState<string | null>(null);
    const msgRef = useRef<HTMLTextAreaElement | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
    const [dialogContent, setDialogContent] = useState<DialogContentType | null>();
    const [signSuccessfull, setSignSuccessfull] = useState<boolean>(false);

    const openDialog = () => setIsDialogOpen(true);
    const closeDialog = () => setIsDialogOpen(false);

    const handleSignMessage = async () => {

        if (connected && publicKey && msgRef.current) {
            if (msgRef.current?.value && signMessage) {
                const encodedMsg = new TextEncoder().encode(msgRef.current.value)
                const signature = await signMessage(encodedMsg);
                if (!ed25519.verify(signature, encodedMsg, publicKey.toBytes())) {
                    setDialogContent({
                        title: "UhOh :( Message Sign Failed",
                        description: `Some isuue occured !!!`
                    })
                    setSignSuccessfull(false);
                    openDialog();
                } else {
                    setDialogContent({
                        title: "Congrats :) Message Sign Successfull",
                        description: `Message Signature: ${bs58.encode(signature)}`
                    })
                    setSignSuccessfull(true);
                    openDialog();
                }
            } else {
                toast.toast({
                    title: "Message Required",
                    description: "Message is required without it, makes no sense"
                })
            }
        }
    }

    useEffect(() => {
        if (publicKey) {
            setPubKey(publicKey.toString());
        }
    }, [publicKey])

    return (
        <WalletConnectState active={(connected && (!!publicKey) && (!!signMessage)) ?? false}>
            <CardHeader>
                <CardTitle className="text-2xl w-full flex flex-row justify-between items-center">
                    Sign Message
                    <Link href={"/"}>
                        <Button variant={"secondary"} size={"sm"}>
                            <ArrowLeftIcon className={"w-4 h-4 mr-2"} />
                            Back
                        </Button>
                    </Link>
                </CardTitle>
                <CardDescription>
                    Enter your message and sign
                </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
                <div className="grid gap-2" aria-disabled>
                    <Label htmlFor="solAmount">Public Key</Label>
                    <Input id="publicKey" type="publicKey" placeholder="Public Key" value={pubKey ?? ""} disabled />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="solAmount">Text Message</Label>
                    <Textarea ref={msgRef} id="msg" placeholder="Enter your text" required />
                </div>
            </CardContent>
            <CardFooter>
                <Button className="w-full" onClick={handleSignMessage}>Sign</Button>
                {dialogContent && <InformationDialog isOpen={isDialogOpen} setIsOpen={setIsDialogOpen} closeAction={closeDialog} content={dialogContent} successTrigger={signSuccessfull} />}
            </CardFooter>
        </WalletConnectState>
    )
}

export default SignMessage;
