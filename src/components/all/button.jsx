export default function Button({ children, onClick, className, disabled }) {
    return (
        <button
            {...onClick ? {onClick: onClick} : {}}
            {...disabled ? {disabled: disabled} : {}}
            className={
                `flex items-center justify-center transition-colors border rounded-md gap-1
                enabled:hover:bg-[#27272A] [&_*]:disabled:text-[#7D7D84]
                ${className ?? ""}`
            }
        >
            {children}
        </button>
    )
}