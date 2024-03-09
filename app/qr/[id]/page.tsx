import prisma from '@/lib/prisma'
import { notFound } from 'next/navigation'
import { handleError } from '@/utils/utils'
import QR from '@/components/QR'

async function getAIQR(id: string) {
    try {
        const data = await prisma.qr.findFirst({
            where: {
                id: id,
            },
        })
        return JSON.parse(JSON.stringify(data))
    } catch (error) {
        handleError(error)
    }
}

export default async function Results({
    params,
}: {
    params: {
        id: string
    }
}) {
    console.log(params.id)
    const data = await getAIQR(params.id)

    if (!data) {
        notFound()
    }
    return (
        <QR
            prompt={data.prompt}
            imageUrl={data.image}
            redirectUrl={data.website_url}
            modelLatency={Number(data.model_latency)}
            id={params.id}
        />
    )
}
