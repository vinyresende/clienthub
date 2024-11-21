'use client'

import { useRef, useState, useImperativeHandle, forwardRef } from "react"

import Button from "./button"

function Component({ children }, ref) {
    const boxRef = useRef(null)

    const [isShowing, setIsShowing] = useState(false)

    const closeAnimation = () => {
        // Remove a animação de abertura e começa a de fechamento
        boxRef.current?.classList.remove("animate-modal-expand")
        boxRef.current?.classList.add("animate-modal-close")
    }

    const handleClose = () => {
        closeAnimation()
        setTimeout(() => {
            setIsShowing(false)
        }, 300)
    }

    useImperativeHandle(ref, () => {
        return {
            openModal() { setIsShowing(true) },
            closeModal() { handleClose() }
        }
    }, [])

    return (
        <>
            {isShowing && (
                <div
                    className="absolute bg-[#09090B]/50 flex items-center justify-center top-0 left-0 right-0 bottom-0"
                >
                    <div
                        ref={boxRef}
                        className="md:min-w-[500px] max-w-[500px] min-h-[100px]
                        flex flex-col border rounded backdrop-blur-md p-4
                        transition-all animate-modal-expand"
                    >
                        <div className="w-full flex justify-end">
                            <Button className='w-[25px] h-[25px]' onClick={() => { handleClose() }}>
                                <i className='bx bx-x text-[20px]' />
                            </Button>
                        </div>
                        {children}
                    </div>
                </div>
            )}
        </>
    )
}

const Modal = forwardRef(Component)

export default Modal
