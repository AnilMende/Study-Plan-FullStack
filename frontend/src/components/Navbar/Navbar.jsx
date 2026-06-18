import { Bell, Search } from "lucide-react";
import { useAuth } from "../../context/AuthContext.jsx";
import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

import getInitials from "../../utils/getInitials.js";
import AddTopicModal from "../dashboard/AddTopicModal.jsx";
import SearchDropdown from "../dashboard/SearchDropdown.jsx";
import NotificationDropdown from "../dashboard/NotificationDropdown.jsx";
import UserProfile from "./UserProfile.jsx";

import { pageTitles } from "../../utils/pageTitles.js";
import { updateProfile } from "../../services/userService.js";

const Navbar = ({ onTopicCreated }) => {

    const { user } = useAuth();

    const [openModal, setOpenModal] = useState(false);

    const [showModal, setShowModal] = useState(false);

    const location = useLocation();

    const currentTitle = pageTitles[location.pathname] || "Dashboard";

    const profileRef = useRef();

    useEffect(() => {

        const handleClickOutside =
            (event) => {

                if (
                    profileRef.current &&
                    !profileRef.current.contains(
                        event.target
                    )
                ) {

                    setShowModal(false);

                }
            };

        document.addEventListener(
            "mousedown",
            handleClickOutside
        );

        return () =>
            document.removeEventListener(
                "mousedown",
                handleClickOutside
            );

    }, []);


    return (
        <header className="h-20 w-full bg-white border-b border-gray-200 px-6 flex items-center justify-between">

            {/* Left */}
            <div>
                <h2 className="text-2xl font-bold text-gray-900">
                    {currentTitle}
                </h2>
            </div>

            {/* Right */}
            <div className="flex items-center gap-4">

                {/* Search */}
                <div className="relative">

                    <Search
                        size={18}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <SearchDropdown />

                </div>

                {/* Add Button */}
                <button
                    onClick={() => setOpenModal(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 
                rounded-xl font-medium transition-all cursor-pointer">
                    + Add Topic
                </button>

                {/* Notification */}
                <NotificationDropdown />

                {/* Avatar */}
                <div ref={profileRef}
                    className="relative"
                >
                    <div className="relative">
                        <button
                            className="w-11 h-11 rounded-full bg-blue-600 
                        text-white flex items-center justify-center 
                        font-semibold text-sm cursor-pointer"
                            onClick={() => setShowModal(!showModal)}
                        >

                            {getInitials(user?.name)}

                        </button>
                        {
                            showModal && (
                                <UserProfile
                                    onClose={() => setOpenModal(false)}
                                />
                            )
                        }

                    </div>
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