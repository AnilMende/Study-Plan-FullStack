import { AlertTriangle } from "lucide-react";
import { useState } from "react";
import DeleteAccountModal from "./DeleteAccountModal.jsx";


const DangerZone = () => {

    const [showModal, setShowModal] = useState(false);

    return (

        <>
            <div className="bg-white border border-red-200 rounded-2xl p-6 shadow-sm">

                <div className="flex justify-between items-center">

                    <div className="flex items-center gap-4">

                        <div className="w-10 h-10 rounded-lg bg-red flex items-center justify-center">
                            <AlertTriangle size={20} className="text-red-600" />
                        </div>

                        <div>

                            <h3
                                className="text-lg font-semibold text-red-700"
                            >
                                Danger Zone
                            </h3>

                            <p
                                className="text-sm text-gray-500"
                            >
                                Permanently remove
                                your account
                            </p>

                        </div>

                    </div>

                    <button
                        onClick={() => setShowModal(true)}
                        className="
                            px-4
                            py-2.5
                            rounded-xl
                            border
                            border-gray-200
                            bg-red-500
                            hover:bg-red-600
                            text-white
                            cursor-pointer
                        "
                    >
                        Delete Account
                    </button>

                </div>

            </div>
            {
                showModal && (

                    <DeleteAccountModal
                        onClose={() => setShowModal(false)}
                    />
                )
            }
        </>
    )
}

export default DangerZone;