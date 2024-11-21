'use client'

import { useRef, useState, useImperativeHandle, forwardRef } from "react"

function Component({}, ref) {
    const inputRef = useRef(null)

    const [file, setFile] = useState(null)

    const handleChange = (e) => {
        const file = e.target.files[0]
        setFile(file)
    }

    const onClick = (e) => {
        e.preventDefault()
        inputRef.current?.click()
    }

    useImperativeHandle(ref, () => {
        return {
            getFile() { return file }
        }
    }, [file])

    return (
        <>
            <input
                ref={inputRef}
                type="file"
                className="hidden"
                onChange={(e) => { handleChange(e) }}
            />

            <div
                className="bg-transparent h-[35px]
                flex items-center justify-between
                border rounded-md text-[14px]"
            >
                <span className="m-3 truncate">{file?.name ?? 'Selecione um arquivo'}</span>

                <button
                    className="h-full flex items-center justify-center border-l gap-2 px-3"
                    onClick={(e) => { onClick(e) }}
                >
                    <i className='bx bx-upload' />
                    Buscar...
                </button>
            </div>
        </>
    )
}

const FileInput = forwardRef(Component)

export default FileInput
