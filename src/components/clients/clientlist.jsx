'use client'

import { useState, useEffect } from "react"
import { getAllClients } from "@/server/clients"

import Link from "next/link"
import ClientTable from "./clienttable"
import Button from "@/components/all/button"
import ListPagination from "../all/pagination"

const ROWS_PER_PAGE = 8

export default function ClientList() {
    const [page, setPage] = useState(1)
    const [pageCount, setPageCount] = useState(1)

    const [clients, setClients] = useState([])
    const [filter, setFilter] = useState("")

    const updateList = async () => {
        const res = JSON.parse(await getAllClients(filter, page, ROWS_PER_PAGE))

        if (res.clients) { setClients(res.clients) }
        if (res.pageCount) { setPageCount(res.pageCount) }

        if (page > res.pageCount) { setPage(1) }
    }

    useEffect(() => {
        updateList()
    }, [page, filter])

    return (
        <div className="w-full flex flex-col gap-5">
            <div className="w-full flex mt-4 max-[420px]:flex-col-reverse max-[420px]:gap-1">
                <div className="w-1/2 flex">
                    <input
                        type="text"
                        placeholder="Filtrar por nome..."
                        className="bg-transparent w-[225px] h-[30px] border rounded-md px-2 text-[14px]"
                        onInput={(e) => { setFilter(e.target.value) }}
                    />
                </div>

                <div className="w-1/2 flex min-[420px]:justify-end max-">
                    <Link href="/clientes/add">
                        <Button className="h-[30px] max-h-[30px] px-5">
                            <i className='bx bx-plus-circle' /><span className="text-[14px]">Novo Cliente</span>
                        </Button>
                    </Link>
                </div>
            </div>

            <ClientTable clients={clients} updateList={updateList} />

            <div className="w-full flex items-center justify-end gap-2 mb-6">
                <ListPagination page={page} totalPages={pageCount} setPage={setPage} />
            </div>
        </div>
    )
}