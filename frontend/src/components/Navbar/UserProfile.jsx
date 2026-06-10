import { useEffect, useState } from "react";
import { getProfile } from "../../services/userService.js";
import { LogOut, Settings } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import { logoutUser } from "../../services/authService.js";


const UserProfile = ({ onClose }) => {

    const [userData, setUserData] = useState(null);

    useEffect(() => {

        const fetchProfileData = async () => {

            try {

                const data = await getProfile();

                setUserData(data);

            } catch (error) {
                console.log(error);
            }
        };

        fetchProfileData();

    }, []);

    const { setUser } = useAuth();

    // Logout handler
    const handleLogout = async () => {

        try {

            await logoutUser();
            setUser(null);
            toast.success("Logged Out Successfully");

        } catch (error) {
            //console.log(error);
            toast.error("LogOut failed");
        }
    }


    if (!userData) {

        return (
            <div className="absolute top-14 right-0 bg-white 
            rounded-xl shadow-lg border border-gray-200 p-4 w-72 z-50">
                Loading...
            </div>
        )
    }

    return (

        <div className="absolute topc-14 right-0 w-72 bg-white 
        rounded-2xl border border-gray-200 shadow-xl z-50 overflow-hidden">

            {/* Header */}
            <div className="p-5 border-b border-gray-100">

                <div className="flex items-center gap-3">

                    <div className="w-12 h-12 rounded-full bg-blue-600 text-white 
                    flex items-center justify-center font-semibold">

                        {
                            userData.name
                                ?.split(" ")
                                .map(
                                    word =>
                                        word[0]
                                )
                                .join("")
                        }

                    </div>

                    <div>

                        <h3 className="font-semibold text-gray-900">
                            {userData.name}
                        </h3>

                        <p className="text-sm text-gray-500">
                            {userData.email}
                        </p>

                    </div>

                </div>

            </div>

            {/* Menu */}
            <div className="p-2">

                <Link to="/settings"
                    onClick={onClose}
                    className="flex items-center gap-3 px-4 py-3 
                rounded-xl hover:bg-gray-100 transition-colors"
                >
                    <Settings size={18} />

                    <span>
                        Settings
                    </span>


                </Link>

                <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl 
                hover:bg-red-50 text-red-600 transition-colors cursor-pointer"
                >
                    <LogOut size={18} />

                    <span>
                        Logout
                    </span>
                    
                </button>
            </div>
        </div>
    )
}

export default UserProfile;