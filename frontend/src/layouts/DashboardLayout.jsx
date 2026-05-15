import Navbar from "../components/Navbar/Navbar.jsx";
import Sidebar from "../components/Sidebar/Sidebar.jsx";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
    return (
        <div className="flex min-h-screen bg-[#f5f7fb]">

            <Sidebar />

            {/* Main Section */}
            <div className="flex-1 flex flex-col">

                {/* Navbar */}
                <Navbar />

                {/* Page content */}
                <main className="flex-1 p-6 overflow-y-auto">
                    <Outlet />
                </main>
                
            </div>
        </div>
    )
}

export default DashboardLayout;