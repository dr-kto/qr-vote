import Vote from '@/components/Vote'
import VoteUp from '@/components/VoteUp'
import { notFound } from 'next/navigation'
import prisma from '@/lib/prisma'
import { handleError } from '@/utils/utils'
import { visitedQR } from '@/actions/qr.actions'

async function getAIQR(id: string) {
    try {
        const data = await prisma.qr.findFirst({
            where: {
                id: id,
            },
        })
        return JSON.parse(JSON.stringify(data))
    } catch (error) {
        console.log(error)
    }
}

export default async function page({
    params,
}: {
    params: {
        id: string
    }
}) {
    const data = await getAIQR(params.id)

    if (!data) {
        notFound()
    }

    let isVoted = false

    if (data?.vote) {
    } else if (data?.vote) {
        isVoted = true
    }

    return (
        <Vote isVoted={isVoted} id={params.id}>
            <VoteUp id={params.id} />
        </Vote>
    )
}
