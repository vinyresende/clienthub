import Link from "next/link"
import Button from "@/components/all/button"
import FileList from "@/components/files/filelist"
import BackButton from "@/components/all/backbutton"
import ClientInfo from "@/components/clients/clientinfo"

export const dynamic = 'force-dynamic'

export default async function SingleClientPage({ params }) {
    const { id } = params

    return (
        <main className="w-full h-screen flex flex-col justify-center items-center overflow-y-auto px-5 py-5">

            <div className="w-full h-full flex flex-col rounded-md px-4 py-4">

                <div className="w-full">
                    <BackButton />
                </div>

                <div className="flex mt-5">
                    <div className="w-1/2">
                        <h1 className="font-bold text-[20px]">Informações do cliente</h1>
                    </div>
                    
                    <div className="w-1/2 flex justify-end">
                        <Link href={`/clientes/${id}/edit`}>
                            <Button className="h-[30px] px-5">
                                <i className='bx bxs-edit-alt' /><span className="text-[14px]">Editar</span>
                            </Button>
                        </Link>
                    </div>
                </div>

                <ClientInfo id={id} />

                <div className="w-full flex flex-col">
                    <FileList />
                </div>

            </div>

        </main>
    )
}
