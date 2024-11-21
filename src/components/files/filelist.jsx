'use client'

import { useParams } from "next/navigation"
import { useState, useEffect } from "react"
import { clientFileList } from "@/server/dropbox"

import FileTable from "./filetable"
import ListPagination from "../all/pagination"

const ROWS_PER_PAGE = 4

export default function FileList() {
    const { id } = useParams()
    const [page, setPage] = useState(1)
    const [files, setFiles] = useState([])
    const [nameFilter, setNameFilter] = useState("")

    const filteredFiles = filterFiles()
    const totalPages = Math.ceil((filteredFiles.length) / ROWS_PER_PAGE)

    async function updateFiles() {
        try {
            const res = JSON.parse(await clientFileList(id))
    
            setFiles(res.files)
        } catch (err) {
            return
        }
    }

    function filterFiles() {
        let result
        if (nameFilter.trim() !== "") {
            result = files.filter(file => {
                return file.name.toLowerCase().trim()
                .includes(nameFilter.toLowerCase().trim())
            })

            if (page !== 1) { // Verifica se a página já é 1, seguindo o código em caso contrário
                setPage(1) // altera a página para 1
            }
        } else {
            result = files
        }

        return result
    }

    useEffect(() => {
        updateFiles(id)
    }, [])

    return (
        <div className="w-full flex flex-col gap-2 mt-5">
            <span className="text-[20px]">Arquivos</span>

            <FileTable files={filteredFiles.slice((ROWS_PER_PAGE * page) - ROWS_PER_PAGE, ROWS_PER_PAGE * page)} setNameFilter={setNameFilter} updateFiles={updateFiles} />

            <div className="w-full flex items-center justify-end gap-2 mt-4 mb-6">
                <ListPagination
                    page={page}
                    totalPages={totalPages || 1}
                    setPage={setPage}
                />
            </div>
        </div>
    )
}