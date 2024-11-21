'use client'

import ClientCard from "./clientcard"

import { useEffect, useState } from "react"
import { getClient } from "@/server/clients"

export default function ClientInfo({ id }) {
    const [client, setClient] = useState(null)

    useEffect(() => {
        const fetchClient = async () => {
            const res = JSON.parse(await getClient(id))
            setClient(res.client)
        }

        fetchClient()
    }, [])

    return (
        <div className="w-full flex mt-5 max-md:flex-col-reverse max-md:gap-2">

            {client && (
                <>
                    <div className="w-1/2 flex flex-col gap-3">
                        <div className="flex flex-col">
                            <span className="text-[18px]">Endereço</span>
                            <span className="text-[14px] text-[#7D7D84]">{client.address}</span>
                        </div>

                        <div className="flex flex-col">
                            <span className="text-[18px]">Nota</span>
                            <span className="text-[14px] text-[#7D7D84]">{client.note}</span>
                        </div>
                    </div>

                    <div className="md:w-1/2 flex justify-end">
                        <ClientCard info={client} />
                    </div>
                </>
            )}

        </div>
    )
}