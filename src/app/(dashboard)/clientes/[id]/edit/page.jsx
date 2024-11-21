import BackButton from "@/components/all/backbutton"
import EditClientForm from "@/components/forms/editclientform"

export const dynamic = 'force-dynamic'

export default async function EditClientPage({ params }) {
    const { id } = params

    return (
        <main className="w-full h-screen flex flex-col justify-center items-center overflow-y-auto px-5 py-5">

            <div className="w-full h-full flex flex-col rounded-md px-4 py-4">
                <div className="w-full">
                    <BackButton />
                </div>

                <EditClientForm id={id} />
            </div>

        </main>
    )
}