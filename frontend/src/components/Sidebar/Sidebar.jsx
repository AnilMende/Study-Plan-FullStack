
import {
    BarChart3, BookOpen,
    CalendarDays, LayoutDashboard,
    Settings, LogOut
} from "lucide-react";

import { NavLink } from "react-router-dom";

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
    return (
        <aside className="w-[250px] bg-white border-r border-gray-200 flex flex-col justify-between">

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
                                            ? "bg-blue-50 text-blue-600 font-semibold"
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

                {/* Logout */}
                <div className="p-4 border-t border-gray-100">

                    <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-500 
                    hover:bg-gray-100 transition-all">

                        <LogOut size={20} />
                        <span>Logout</span>
                    </button>
                </div>
            </div>
        </aside>
    )
}

export default Sidebar;