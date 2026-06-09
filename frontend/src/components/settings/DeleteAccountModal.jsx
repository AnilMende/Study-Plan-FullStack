
import { useState } from "react";
import toast from "react-hot-toast";
import { AlertTriangle, X } from "lucide-react";
import { deleteAccount } from "../../services/userService.js";

const DeleteAccountModal = ({ onClose }) => {

    const [loading, setLoading] = useState(false);

    const [confirmText, setConfirmText] = useState("");

    const handleDelete = async () => {

        try {

            setLoading(true);

            await deleteAccount();

            toast.success("Account deleted");

            localStorage.clear();

            window.location.href = "/login"

        } catch (error) {

            toast.error("Failed to Delete account");

        } finally {

            setLoading(false);

        }
    };


    return (

        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">

            <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6">

                {/* Header */}
                <div className="flex justify-between items-start mb-5">

                    <div className="flex items-center gap-3">

                        <div className="w-10 h-10 rounded-lg bg-red flex items-center justify-center">
                            <AlertTriangle size={20} className="text-red-600" />
                        </div>

                        <div>

                            <h3
                                className="text-lg font-semibold"
                            >
                                Delete Account
                            </h3>

                            <p
                                className="text-sm text-gray-500"
                            >
                                This action cannot
                                be undone
                            </p>

                        </div>

                    </div>

                    <button
                        onClick={onClose}
                        className="
                            text-gray-400
                            hover:text-gray-600
                            cursor-pointer
                        "
                    >

                        <X size={18} />

                    </button>

                </div>

                {/* Warning */}
                <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-5">
                    <p className="text-sm text-red-700">
                        Deleting your account
                        will remove access to
                        all subjects, topics,
                        analytics, revisions,
                        and streak data.
                    </p>
                </div>

                {/* Confirmation */}
                <div className="mb-5">
                    <label className="text-sm font-medium text-gray-700 block mb-2">
                        Type DELETE to continue
                    </label>

                    <input
                        value={confirmText}
                        onChange={(e) => setConfirmText(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 
                    focus:ring-2 focus:ring-red-400 outline-none"
                    />
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="
                            px-4
                            py-2.5
                            rounded-xl
                            border
                            border-gray-200
                            hover:bg-gray-50
                            cursor-pointer
                        "
                    >
                        Cancel
                    </button>


                    <button
                        onClick={handleDelete}
                        disabled={
                            confirmText !== "DELETE" || loading
                        }
                        className="px-5 py-3 rounded-xl bg-red-500 text-white 
                hover:bg-red-600 disabled:opacity-50 transition cursor-pointer">
                        {
                            loading
                                ? "Deleting..."
                                : "Delete Account"
                        }
                    </button>

                </div>

            </div>
        </div>
    )
}

export default DeleteAccountModal;