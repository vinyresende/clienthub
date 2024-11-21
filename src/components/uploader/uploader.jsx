'use client'

import { useParams } from "next/navigation"
import { uploadFile } from "@/server/dropbox"
import { useActionState, useRef, useEffect } from "react"

import Button from "../all/button"
import FileInput from "../all/fileinput"

export default function Uploader({ endAction }) {
    const { id } = useParams()

    const fileInput = useRef(null)
    const [result, formAction, pending] = useActionState(onSubmit, null)

    async function onSubmit() {
        try {
            const file = fileInput.current?.getFile()

            if (file) {
                const formData = new FormData()
                formData.append('file', file)

                const res = await uploadFile(id, formData)
                return JSON.parse(res)
            }

            return { ok: false, error: "Nenhum arquivo foi selecionado!" }
        } catch(err) {
            return { ok: false, error: "Erro ao enviar arquivo!" }
        }
    }

    useEffect(() => {
        if (result?.ok) {
            endAction()
        }
    }, [result])

    return (
        <form className="grid grid-cols-1 gap-3 mt-3" action={() => { formAction() }}>
            {!pending ? (
                <>
                    {result?.error && (
                        <span className="text-red-500">{result?.error}</span>
                    )}

                    <FileInput ref={fileInput} />
        
                    <Button className="w-full py-1">
                        Enviar arquivo
                    </Button>
                </>
            ) : (
                <div className="flex flex-col items-center justify-center gap-3">
                    <div className="continuous-loader" />
                    <span>Enviando arquivo...</span>
                </div>
            )}
        </form>
    )
}
