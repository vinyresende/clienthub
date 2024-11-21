'use client'

import { useRouter, usePathname } from "next/navigation"

export default function BackButton() {
    const router = useRouter()
    const pathname = usePathname()
    const href = pathname.slice(0, pathname.lastIndexOf('/', pathname.length[-2]))

    return (
        <button className="flex items-center justify-center gap-2" onClick={() => { router.push(href) }}>
            <i className='bx bx-arrow-back text-[20px] border border-white rounded-full p-2' /> Voltar
        </button>
    )
}
