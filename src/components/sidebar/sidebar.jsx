'use client'

import { useState } from "react"

import Link from "next/link"
import MenuBtn from "./menubtn"
import Button from "../all/button"

export default function Sidebar() {
    const [isShowing, setShowing] = useState(false)

    const toggleMenu = () => {
        setShowing(!isShowing)
    }

    return (
        <>
            <Button className={`max-md:absolute left-2 top-2 md:hidden backdrop-blur-sm p-3 ${isShowing ? 'hidden' : ''}`} onClick={() => { toggleMenu() }}>
                <i className='bx bx-menu' />
            </Button>

            <div className={`min-w-[240px] w-[240px] h-screen flex flex-col border-r backdrop-blur-sm transition max-md:absolute max-md:left-[-240px] ${isShowing && "max-md:translate-x-[240px]"}`}>

                <Button className='md:hidden h-[40px] min-h-10 m-3' onClick={() => { toggleMenu() }}>
                    <i className='bx bx-left-arrow-alt text-[18px]' /><span>Fechar menu</span>
                </Button>

                <div className="flex items-center justify-center my-5">
                    <Link href="/">
                        <img src="/logo.svg" alt="site-logo" />
                    </Link>
                </div>

                <div className="flex flex-col px-3 gap-1">
                    <MenuBtn href={'/clientes'}>
                        <i className='bx bxs-user text-[18px]' /><span>Clientes</span>
                    </MenuBtn>
                </div>

                <div className="h-full flex flex-col justify-end p-3">
                    <MenuBtn href={'/auth/logout'}>
                        <i className='bx bx-exit text-[18px]' /><span>Logout</span>
                    </MenuBtn>
                </div>
            </div>
        </>
    )
}