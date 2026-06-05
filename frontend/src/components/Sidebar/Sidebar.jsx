
import {
    BarChart3, BookOpen,
    CalendarDays, LayoutDashboard,
    Settings, LogOut,
    RotateCcw,
    Flame
} from "lucide-react";

import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import { logoutUser } from "../../services/authService.js";
import toast from "react-hot-toast";

const navItems = [
    {
        name: "Dashboard",
        path: "/",
        icon: LayoutDashboard
    },
    {
        name: "Subjects",
        path: "/subjects",
        icon: BookOpen
    },
    {
        name: "Revision",
        path: "/revision",
        icon: RotateCcw
    },
    {
        name: "Streak",
        path: "/streak",
        icon: Flame
    },
    {
        name: "Calendar",
        path: "/calendar",
        icon: CalendarDays
    },
    {
        name: "Analytics",
        path: "/analytics",
        icon: BarChart3
    },
    {
        name: "Settings",
        path: "/settings",
        icon: Settings
    }
]
const Sidebar = () => {

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

    return (
        <aside className="w-[240px] h-screen sticky top-0 bg-white border-r border-gray-200 flex flex-col justify-between">

            <div>
                {/* Logo */}
                <div className="flex items-center gap-2 px-6 py-4 hover:bg-slate-50 rounded-lg cursor-pointer group">

                    <div className="text-blue-500 flex items-center justify-center">
                        <BookOpen className="w-5 h-5 fill-blue-500" strokeWidth={2} />
                    </div>

                    <span className="text-sm font-semibold text-slate-700 
                    group-hover:text-slate-900 transition-colors">
                        StudyPlan
                    </span>

                </div>

                {/* Navigation */}
                <nav className="p-4 space-y-2">
                    {
                        navItems.map((item) => {

                            const Icon = item.icon;

                            return (
                                <NavLink
                                    key={item.name}
                                    to={item.path}
                                    className={({ isActive }) =>
                                        `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
                                    ${isActive
                                            ? "bg-blue-50 text-blue-600 border border-blue-100 shadow-sm font-semibold"
                                            : "text-gray-500 hover:bg-gray-100 hover:text-gray-900"
                                        }`
                                    }
                                >
                                    <Icon size={20} />
                                    <span>{item.name}</span>
                                </NavLink>
                            )
                        })
                    }
                </nav>
            </div>

            {/* Bottom Section */}
            {/* Logout */}
            <div className="p-4 border-t border-gray-100 bg-white">

                <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-500 
                    hover:bg-gray-100 hover:text-gray-900 transition-all cursor-pointer">
                    <LogOut size={20} />
                    <span>Logout</span>
                </button>

            </div>

        </aside>
    )
}

export default Sidebar;