'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"

import Button from "../all/button"
import ConfirmDelete from "./confirmdelete"

export default function ClientRow({ client, updateList }) {
    const router = useRouter()
    const [showModal, setShowModal] = useState(false);

    const redirect = () => {
        router.push(`/clientes/${client.id}`)
    }

    const handleButtonClick = (e) => {
        e.stopPropagation()
        setShowModal(true)
    }

    return (
        <>
            <tr key={client.id} className="hover:bg-[#27272A]/50 h-5 transition-colors cursor-pointer border-b" onClick={() => { redirect() }}>
                <td className="h-10 px-3 truncate">
                    {client.name}
                </td>
                <td className="h-10 px-3">
                    <div className="w-[131px]">{client.cpf}</div>
                </td>
                <td>
                    <div className="w-full flex justify-end px-3">
                        <Button className="w-[30px] h-[30px] border-red-600" onClick={(e) => { handleButtonClick(e) }}>
                            <i className='bx bx-trash-alt text-red-600'/>
                        </Button>

                        {showModal && (<ConfirmDelete id={client.id} name={client.name} setState={setShowModal} updateList={updateList} />)}
                    </div>
                </td>
            </tr>
        </>
    )
}
