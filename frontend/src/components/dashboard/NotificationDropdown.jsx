
import { Bell } from "lucide-react";
import { useEffect, useState } from "react";

import api from "../../api/axios.js";

const NotificationDropdown = () => {

    const [open, setOpen] = useState(false);

    const [notifications, setNotifications] = useState([]);

    useEffect(() => {

        fetchNotifications();

    }, [])

    const fetchNotifications = async () => {

        try {

            const response = await api.get("/notifications");

            setNotifications(response.data.data);

        } catch (error) {

            console.log(error);

        }
    };

    return (
        <div className="relative">

            {/* Bell Button */}
            <button
                onClick={() => setOpen(!open)}
                className="relative bg-white p-3 rounded-2xl border border-gray-200 cursor-pointer">
                <Bell size={22} />
                {
                    notifications.length > 0 && (
                        <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs 
                        rounded-full flex items-center justify-center">
                            {
                                notifications.length
                            }
                        </span>
                    )
                }
            </button>

            {/* Dropdown */}
            {
                open && (

                    <div className="absolute right-0 mt-3 w-[340px] bg-white rounded-2xl 
                    shadow-xl border border-gray-100 p-4 z-50">

                        <h3 className="font-semibold text-lg mb-4">
                            Notifications
                        </h3>

                        <div className="space-y-3 max-h-[400px] overflow-y-auto">
                            {
                                notifications.length > 0 ? (

                                    notifications.map((notification, index) => (

                                        <div key={index} className="p-3 rounded-xl hover:border-2 hover:border-blue-500 
                                        bg-gray-50">

                                            <p className="text-sm text-gray-800">
                                                {notification.message}
                                            </p>
                                        </div>
                                    ))
                                ) : (

                                    <p className="text-sm text-gray-500">
                                        No notifications
                                    </p>
                                )
                            }

                        </div>
                    </div>
                )
            }
        </div>
    );
};

export default NotificationDropdown;