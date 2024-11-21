'use client'

import { useRef } from "react"
import { deleteClient } from "@/server/clients"
import { deleteFolder } from "@/server/dropbox"

import Button from "../all/button"

export default function ConfirmDelete({ id, name, setState, updateList }) {
    const modalRef = useRef(null)

    const closeAnimation = () => {
        // Remove a animação de abertura e começa a de fechamento
        modalRef.current?.classList.remove("animate-modal-expand")
        modalRef.current?.classList.add("animate-modal-close")
    }

    const closeModal = () => {
        // Faz a animação e fecha o modal ao fim do tempo da animação
        closeAnimation()
        setTimeout(() => {
            setState(false)
        }, 300)
    }

    const confirmDelete = () => {
        deleteClient(id)
        deleteFolder(id)
        updateList()
        closeModal()
    }

    return (
        <div className="absolute bg-[#09090B]/50 top-0 left-0 w-screen h-screen flex items-center justify-center backdrop-blur-[1px] cursor-default" onClick={(e) => { e.stopPropagation() }}>
            <div ref={modalRef} className="min-w-[400px] max-w-[500px] min-h-[100px] flex flex-col border border-red-600 rounded p-4 transition-all animate-modal-expand">

                <div className="w-full min-h-[38px]">
                    <span className="text-wrap cursor-text">Deseja mesmo deletar os registros de <strong>{name}</strong>?</span>
                </div>

                <div className="w-full h-[30px] flex items-center justify-center mt-3 gap-3">
                    <Button className="group hover:border-red-600 h-[30px] px-5" onClick={() => { confirmDelete() }}>
                        <span className="group-hover:text-red-600 transition-colors text-[14px]">Deletar</span>
                    </Button>

                    <Button className="h-[30px] px-5" onClick={() => { closeModal() }}>
                        <span className="text-[14px]">Cancelar</span>
                    </Button>
                </div>

            </div>
        </div>
    )
}
