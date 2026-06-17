import { Trash2, X } from "lucide-react";


const DeleteSubjectModel = ({ subjectName, onClose, onConfirm, loading }) => {

    return (
        <div className="fixed inset-0 z-[9999] bg-black/50 flex items-center justify-center px-4">

            <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-6 relative">

                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 cursor-pointer">
                    <X size={20} />
                </button>

                {/* Icon */}
                <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
                    <Trash2 size={26} className="text-red-600" />
                </div>

                <h2 className="text-xl font-bold text-center text-gray-900 mb-2">
                    Delete Subject
                </h2>

                {/* Message */}
                <p className="text-md font-medium text-gray-500 text-center mb-6 ">
                    Are you sure you want to delete
                    <span className="font-semibold text-gray-800">
                        {" "}
                        {subjectName}
                    </span>
                    ?
                </p>

                <div className="bg-red-50 border border-red-200 rounded-xl p-3 mb-6">
                    <p className="text-sm text-red-700">
                        This action cannot be undone.
                    </p>
                </div>

                {/* Buttons */}
                <div className="flex gap-3">

                    <button
                        onClick={onClose}
                        disabled={loading}
                        className="flex-1 py-3 rounded-xl border border-gray-300 text-gray-700 
                        font-medium  hover:bg-gray-100 cursor-pointer"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={onConfirm}
                        disabled={loading}
                        className="flex-1 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white 
                        font-medium cursor-pointer"
                    >
                        {
                            loading
                                ? "Deleting..."
                                : "Delete"
                        }
                    </button>

                </div>

            </div>
        </div>
    )
}

export default DeleteSubjectModel;