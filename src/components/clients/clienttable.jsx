import ClientRow from "./clientrow"

export default function ClientTable({ clients, updateList }) {
    return (
        <div className="w-full border rounded-md max-md:overflow-x-scroll">
            <table className="w-full rounded-md">
                <thead className="w-full h-[35px]">
                    <tr className="hover:bg-[#27272A]/50 transition-colors border-b">
                        <th colSpan="1" className="w-[60%]">
                            <div className="text-[#7D7D84] text-[14px] flex items-center px-3">Name</div>
                        </th>
                        <th colSpan="1">
                            <div className="text-[#7D7D84] text-start text-[14px] px-3">CPF</div>
                        </th>
                        <th></th>
                    </tr>
                </thead>

                <tbody className="[&_tr:last-child]:border-0">
                    {clients && clients.map(client => {
                        return (
                            <ClientRow key={client.id} client={client} updateList={updateList} />
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}