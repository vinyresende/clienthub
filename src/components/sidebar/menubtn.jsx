'use client'

import { usePathname } from 'next/navigation'

import Link from 'next/link'

export default function MenuBtn({ href, children }) {
    const pathname = usePathname()

    const active = pathname.includes(href) ? "bg-[#27272A]" : "hover:bg-[#27272A]"

    return (
        <Link href={href}>
            <button className={`${active} w-full h-10 flex items-center rounded-md transition-colors pl-4 gap-2`}>
                {children}
            </button>
        </Link>
    )
}