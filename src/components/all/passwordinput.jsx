'use client'

import { forwardRef, useImperativeHandle, useRef, useState } from "react"

const PasswordInput = forwardRef(({ title, placeholder, width, required }, ref) => {
    const inputRef = useRef(null)
    const [isShowing, setIsShowing] = useState(false)

    const handleType = () => {
        setIsShowing(!isShowing)
    }

    useImperativeHandle(ref, () => {
        return {
            getValue() {
                return inputRef.current.value
            }
        }
    })

    return (
        <div className="flex flex-col justify-start">
            <span className="text-[14px] mb-1">{title}</span>
            <div className={`w-[${width ?? "250px"}] flex items-center border rounded-md`}>
                <input
                    ref={inputRef}
                    type={isShowing ? 'text' : 'password'}
                    placeholder={placeholder}
                    className={`bg-transparent h-[35px] w-full text-[14px] px-3`}
                    {...required ? {required} : {}}
                />
                <button type="button" className="flex items-center justify-center mr-3" onClick={() => { handleType() }}>
                    <i className={`bx ${isShowing ? "bx-hide" : "bx-show"}`} />
                </button>
            </div>
        </div>
    )
})

export default PasswordInput
