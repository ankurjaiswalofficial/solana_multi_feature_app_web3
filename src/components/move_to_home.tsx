import React from 'react'
import { Button } from './ui/button'
import Link from 'next/link'
import { ArrowLeftIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

function MoveToHome({ full }: Readonly<{ full: boolean }>) {
    return (
        <Button asChild variant={"default"} size={"sm"} className={cn({ "w-full": full },)}>
            <Link href={"/"}>
                <ArrowLeftIcon className={"w-4 h-4 mr-2"} />
                Back
            </Link>
        </Button>
    )
}

export default MoveToHome
