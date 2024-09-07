import React, { ReactNode } from 'react'
import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import MoveToHome from './move_to_home';

function WalletConnectState({ children, active, dev }: Readonly<{ children: ReactNode, active: boolean, dev: boolean }>) {
    if (active) {
        return (
            <Card className="w-full max-w-sm">
                {children}
            </Card>)
    } else {
        return (
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle className="text-2xl w-full flex flex-row justify-between items-center">
                        {dev ? "Under Development" : "Wallet Not Connect"}
                    </CardTitle>
                    <CardDescription>
                        {dev ? "This page is not built yet" : "Go Back and connect your wallet to request airdrop"}
                    </CardDescription>
                </CardHeader>
                <CardFooter>
                    <MoveToHome full={true} />
                </CardFooter>
            </Card>
        )
    }

}

export default WalletConnectState
