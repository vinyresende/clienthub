'use client'

import { useState } from "react/"
import { deleteFile } from "@/server/dropbox"

import Button from "../all/button"
import ConfirmDelete from "./deletefile"

export default function FileRow({ file, updateFiles }) {
    const [showModal, setShowModal] = useState(false)

    const fileUrl = `https://www.dropbox.com/personal/Aplicativos/APP_NAME/${file.path_display}`

    const handleDelete = async () => {
        const res = await deleteFile(file.path_display)
        console.log(res)
    }

    const handleButtonClick = (e) => {
        setShowModal(true)
    }

    return (
        <>
            <tr key={file.id} className="hover:bg-[#27272A]/50 transition-colors cursor-pointer border-b">
                <td className="h-10 px-3">{file.name}</td>
                <td className="w-[26px] px-3">
                    <div className="w-full flex gap-2">
                        <a href={fileUrl} target="_blank">
                            <Button className="h-[30px] px-5 font-normal">
                                <i className='bx bx-show' /><span className="text-[14px]">ver</span>
                            </Button>
                        </a>

                        <Button className="w-[30px] h-[30px] border-red-600 font-normal" onClick={(e) => { handleButtonClick(e) }}>
                            <i className='bx bx-trash-alt text-red-600'/>
                        </Button>

                        {showModal && (<ConfirmDelete name={file.name} setState={setShowModal} updateList={updateFiles} handleDelete={handleDelete} />)}
                    </div>
                </td>
            </tr>
        </>
    )
}
