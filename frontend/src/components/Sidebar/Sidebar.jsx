
import {
    BarChart3, BookOpen,
    CalendarDays, LayoutDashboard,
    Settings, LogOut
} from "lucide-react";

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
                <div className="w-[250px] bg-white border-r border-gray-200 flex flex-col justify-between">

                    <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center 
                    justify-center text-white font-bold">
                        S
                    </div>

                    <h1 className="text-xl font-bold text-gray-900">
                        StudyPlan
                    </h1>
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