import React from 'react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import Link from 'next/link'
import { ArrowLeftIcon } from 'lucide-react'

interface InformationDialogProps {
    isOpen: boolean,
    setIsOpen: (isOpen: boolean) => void,
    closeAction: () => void,
    successTrigger: boolean,
    content: {
        title: string,
        description: string
    },
    homeBtn?: boolean
}

function InformationDialog({ isOpen, setIsOpen, closeAction, successTrigger, content, homeBtn = true }: Readonly<InformationDialogProps>) {
    return (
        <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
            <AlertDialogContent className="">
                <AlertDialogHeader>
                    <AlertDialogTitle className="text-white">
                        {successTrigger && content?.title}

                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-neutral-400 text-wrap break-words text-ellipsis break-all">
                        {successTrigger && content?.description}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    {homeBtn && <AlertDialogAction asChild>
                        <Link href={"/"}>
                            <ArrowLeftIcon className={"w-4 h-4 mr-2"} />
                            Move to Home
                        </Link>
                    </AlertDialogAction>}
                    <AlertDialogAction onClick={closeAction}>Okay</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default InformationDialog
