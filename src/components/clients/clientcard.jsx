export default function ClientCard({ info }) {
    // const birth = formatDateString(new Date(info.birth).getDate())
    const birth = new Date(`${info.birth} 01:00:00`).toLocaleDateString('pt-BR')

    // function formatDateString(dateString) {
    //     const stringArray = dateString.split('-')

    //     return `${stringArray[2]}/${stringArray[1]}/${stringArray[0]}`
    // }

    return (
        <div className="min-w-[400px] flex flex-col border rounded-md p-4">
            <div className="w-full flex gap-2">
                <div>
                    <i className='bx bxs-user text-[70px]'/>
                </div>

                <div className="flex flex-col">
                    <span>{info.name}</span>
                    <span>{info.cpf}</span>
                </div>
            </div>

            <div className="flex justify-between mt-4 gap-2">
                <span className="text-[#7D7D84]">{birth}</span>
                <span className="text-[#7D7D84]">{info.rg}</span>
                <span className="text-[#7D7D84]">{info.phone}</span>
            </div>
        </div>
    )
}