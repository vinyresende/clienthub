'use client'

import { useRef } from "react"
import { useParams } from "next/navigation"

import FileRow from "./filerow"
import Modal from "../all/modal"
import Button from "../all/button"
import Uploader from "../uploader/uploader"

export default function FileTable({ files, setNameFilter, updateFiles }) {
    const { id } = useParams()
    const modalRef = useRef(null)

    const handleModalOpen = () => {
        modalRef.current?.openModal()
    }

    const handleModalClose = async () => {
        modalRef.current?.closeModal()
        await updateFiles(id)
    }

    return (
        <div className="w-full border rounded-md max-md:overflow-x-scroll">
            <table className="w-full rounded-md">
                <thead className="h-[38px]">
                    <tr className="hover:bg-[#27272A]/50 transition-colors border-b">

                        <th className="w-full">
                            <div className="text-[#7D7D84] text-[14px] flex items-center px-3 gap-1">
                                <input
                                    type="text"
                                    placeholder="Filtrar por nome..."
                                    className="bg-transparent w-[225px] h-[30px] border rounded-md px-2 text-[14px] text-white font-normal"
                                    onInput={(e) => { setNameFilter(e.target.value) }}
                                />
                                <Button className="h-[30px] font-normal px-2" onClick={() => { updateFiles() }}>
                                    <i className='bx bx-refresh text-[18px]' />
                                </Button>
                            </div>
                        </th>

                        <th>
                            <div className="h-full text-[#7D7D84] text-[14px] flex items-center px-3">
                                <Button className="h-[30px] px-5 font-normal" onClick={() => { handleModalOpen() } }>
                                    <i className='bx bx-plus-circle' /><span className="text-[14px]">Novo</span>
                                </Button>
                            </div>
                        </th>

                    </tr>
                </thead>

                <tbody className="[&_tr:last-child]:border-0">
                    {files.map(file => {
                        return (
                            <FileRow key={file.id} file={file} updateFiles={updateFiles} />
                        )
                    })}
                </tbody>
            </table>

            <Modal ref={modalRef}>
                <Uploader endAction={() => { handleModalClose() }} />
            </Modal>
        </div>
    )
}