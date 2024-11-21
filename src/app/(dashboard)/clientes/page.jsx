import ClientList from "@/components/clients/clientlist"

export default function ClientsPage() {
    return (
        <main className="w-full h-screen flex flex-col justify-center items-center overflow-y-auto px-5 py-5">

            <div className="w-full h-full flex flex-col rounded-md px-4 py-4">
                <div>
                    <h1 className="font-bold text-[20px]">Lista de clientes</h1>
                    <span className="text-[#7D7D84]">Todos os clientes</span>
                </div>

                <ClientList />
            </div>

        </main>
    )
}