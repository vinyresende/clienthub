'use client'

import { forwardRef, useImperativeHandle, useRef } from "react"

const TextInput = forwardRef(({ title, placeholder, width, required, ...rest }, ref) => {
    const inputRef = useRef(null)

    useImperativeHandle(ref, () => {
        return {
            getValue() {
                return inputRef.current?.value
            },
            setValue(value) {
                inputRef.current.value = value
            }
        }
    })

    return (
        <div className="flex flex-col justify-start">
            <span className="text-[14px] mb-1">{title}</span>
            <input
                ref={inputRef}
                type="text"
                placeholder={placeholder}
                className={`bg-transparent h-[35px] w-[${width ?? "250px"}] border text-[14px] rounded-md px-3`}
                {...required ? {required} : {}}
                {...rest}
            />
        </div>
    )
})

export default TextInput
