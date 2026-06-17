
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext.jsx";
import { logoutUser } from "../../services/authService.js";
import { LogOut } from "lucide-react";

const LogoutModal = ({ onClose }) => {

    const { setUser } = useAuth();

    // Logout handler
    const handleLogout = async () => {

        try {

            await logoutUser();
            setUser(null);

            toast.success("Logged out Successfully");

        } catch (error) {
            toast.error("Failed to LogOut");
        }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center"
            onClick={onClose}
        >

            {/* Modal */}
            <div onClick={(e) => e.stopPropagation()}
                className="bg-white w-full max-w-lg min-h-[320px] rounded-2xl shadow-2xl p-8 animate-in fade-in zoom-in">
                {/* Icon */}
                <div className="flex justify-center mb-6">

                    <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center">
                        <LogOut size={28} className="text-red-600" />

                    </div>

                </div>

                {/* Heading */}
                <h3
                    className="text-xl font-semibold text-center text-gray-900"
                >
                    Logout
                </h3>

                {/* Message */}
                <p
                    className="text-center text-gray-500 mt-3"
                >
                    Are you sure you want to logout from your account?
                </p>

                {/* Buttons */}
                <div className="flex gap-3 mt-8"
                >

                    <button
                        onClick={onClose}
                        className="flex-1 py-3 border border-gray-300 rounded-xl 
                        font-medium hover:bg-gray-100 transition-all cursor-pointer"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={handleLogout}
                        className="flex-1 py-3 bg-red-600 text-white rounded-xl 
                        font-medium hover:bg-red-700 transition-all cursor-pointer"
                    >
                        Logout
                    </button>

                </div>

            </div>

        </div>
    )
}

export default LogoutModal;