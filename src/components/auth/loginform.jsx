'use client'

import { signIn } from "next-auth/react"
import { useState, useRef } from "react"
import { useRouter } from "next/navigation"

import Button from "../all/button"
import TextInput from "../all/textinput"
import PasswordInput from "../all/passwordinput"

export default function LoginForm() {
    const router = useRouter()
    const [errorMessage, setErrorMessage] = useState(null)

    const usernameInputRef = useRef(null)
    const passwordInputRef = useRef(null)

    const onSubmit = async (e) => {
        e.preventDefault()

        const username = usernameInputRef.current.getValue()
        const password = passwordInputRef.current.getValue()

        const result = await signIn('credentials', {
            username: username,
            password: password,
            redirect: false,
            callbackUrl: '/'
        })

        if (result.ok) {
            router.push('/')
        } else {
            setErrorMessage(result.error)
        }
    }

    return (
        <form className="w-[350px] flex flex-col border rounded-md p-4 gap-3" onSubmit={(e) => { onSubmit(e) }}>

            <div className="mb-1">
                <h1 className="text-[20px] font-bold">Login</h1>
            </div>

            {errorMessage && (
                <div className="bg-red-500 w-full rounded-md p-2">
                    <span className="text-[14px]">{errorMessage}</span>
                </div>
            )}

            <TextInput ref={usernameInputRef} title="Nome de usuário" placeholder="Digite o nome de usuário" width="100%" required />
            <PasswordInput ref={passwordInputRef} title="Senha" placeholder="Digite sua senha" width="100%" required />

            <Button className="h-[35px]">
                Login
            </Button>
        </form>
    )
}