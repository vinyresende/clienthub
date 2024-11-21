import BackButton from "@/components/all/backbutton"
import AddClientForm from "@/components/forms/addclientform"

export default function AddCustomerPage() {
    return (
        <main className="w-full h-screen flex flex-col justify-center items-center overflow-y-auto px-5 py-5">

            <div className="w-full h-full flex flex-col rounded-md px-4 py-4">
                <div className="w-full">
                    <BackButton />
                </div>

                <AddClientForm />
            </div>

        </main>
    )
}