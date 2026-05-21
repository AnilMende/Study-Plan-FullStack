import { Bell, Search } from "lucide-react";
import getInitials from "../../utils/getInitials.js";
import { useAuth } from "../../context/AuthContext.jsx";
import { useState } from "react";
import AddTopicModal from "../dashboard/AddTopicModal.jsx";

const Navbar = ({ onTopicCreated }) => {

    const { user } = useAuth();

    const [openModal, setOpenModal] = useState(false);


    return (
        <header className="h-20 w-full bg-white border-b border-gray-200 px-6 flex items-center justify-between">

            {/* Left */}
            <div>
                <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
            </div>

            {/* Right */}
            <div className="flex items-center gap-4">

                {/* Search */}
                <div className="relative">

                    <Search
                        size={18}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <input
                        type="text"
                        placeholder="Search topics, subjects..."
                        className="w-[260px] pl-10 pr-4 py-3 rounded-xl border border-gray-200 
                        outline-none focus:ring-2 focus:ring-blue-500"
                    />

                </div>

                {/* Add Button */}
                <button
                    onClick={() => setOpenModal(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 
                rounded-xl font-medium transition-all cursor-pointer">
                    + Add Topic
                </button>

                {/* Notification */}
                <button className="w-11 h-11 rounded-xl border border-gray-200 flex items-center 
                justify-center hover:bg-gray-100">
                    <Bell size={20} className="text-gray-600" />
                </button>

                {/* Avatar */}
                <div className="w-11 h-11 rounded-full bg-blue-600 text-white flex items-center 
                justify-center font-semibold text-sm">
                    {getInitials(user?.name)}
                </div>

            </div>
            {
                openModal && (
                    <AddTopicModal
                        onClose={
                            () => setOpenModal(false)
                        }
                        onTopicCreated={
                            onTopicCreated
                        }
                    />
                )
            }
        </header>
    )
}

export default Navbar;