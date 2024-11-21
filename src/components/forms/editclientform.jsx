'use client'

import "@/inputformat"

import { useRouter } from "next/navigation"
import { getClient } from "@/server/clients"
import { editClient } from "@/server/clients"
import { useRef, useEffect, useState } from "react"
import { cpfFormat, dateFormat, phoneFormat, rgFormat } from "@/inputformat"

import Button from "@/components/all/button"
import TextInput from "@/components/all/textinput"

export default function EditClientForm({ id }) {
    const router = useRouter()

    // refs de inputs
    const nameInput = useRef(null)
    const cpfInput = useRef(null)
    const rgInput = useRef(null)
    const addressInput = useRef(null)
    const birthInput = useRef(null)
    const phoneInput = useRef(null)
    const note = useRef(null)

    const [client, setClient] = useState(null)

    useEffect(() => {
        const fetchClient = async () => {
            const res = JSON.parse(await getClient(id))
            setClient(res.client)
        }

        fetchClient()
    }, [])

    useEffect(() => {
        // Seta os valores dos inputs como as informações do cliente (caso `client` exista)
        if (client) {
            const dateArray = client.birth.split('-')
            const birth = `${dateArray[2]}/${dateArray[1]}/${dateArray[0]}`

            nameInput.current.setValue(client.name)
            cpfInput.current.setValue(client.cpf)
            rgInput.current.setValue(client.rg)
            addressInput.current.setValue(client.address)
            birthInput.current.setValue(birth)
            phoneInput.current.setValue(client.phone)
            note.current.setValue(client.note)
        }
    }, [client])

    const onSubmit = (e) => {
        e.preventDefault()

        // valores de inputs
        const name = nameInput.current.getValue()
        const cpf = cpfInput.current.getValue()
        const rg = rgInput.current.getValue()
        const address = addressInput.current.getValue()
        const birth = birthInput.current.getValue()
        const phone = phoneInput.current.getValue()
        const note = note.current.getValue()

        const info = { name, cpf, rg, address, birth, phone, note }

        editClient(client.id, info)
        router.push(`/clientes/${client.id}`)
    }

    return (
        <>
            {client && (
                <form className="w-[60%] flex flex-col gap-5" onSubmit={(e) => { onSubmit(e) }}>

                    <div className="border-b py-5">
                        <h1 className="font-bold text-[20px]">Editar informações do cliente</h1>
                    </div>

                    <TextInput ref={nameInput} title="Nome do cliente" placeholder="Cliente da Silva Santos" width="100%" required />
                    <TextInput ref={cpfInput} title="CPF do cliente" placeholder="000.000.000-00" width="100%" onInput={(e) => { cpfFormat(e) }} maxLength="14" required />
                    <TextInput ref={rgInput} title="RG do cliente" placeholder="00.000.000" width="100%" onInput={(e) => { rgFormat(e) }} maxLength="10" required />
                    <TextInput ref={addressInput} title="Endereço completo" placeholder="Rua dos bobos, número 0, Miraí-MG, 36.790-0000" width="100%" />
                    <TextInput ref={birthInput} title="Data de nascimento" placeholder="00/00/0000" width="100%" onInput={(e) => { dateFormat(e) }} maxLength="10" required />
                    <TextInput ref={phoneInput} title="Telefone" placeholder="(32) 99999-9999" width="100%" onInput={(e) => { phoneFormat(e) }} maxLength="15" />
                    <TextInput ref={note} title="Nota" placeholder="" width="100%" />

                    <div className="mb-6">
                        <Button className="h-[35px] px-6">
                            <i className='bx bx-save'/><span className="text-[14px]">Salvar</span>
                        </Button>
                    </div>

                </form>
            )}
        </>
    )
}