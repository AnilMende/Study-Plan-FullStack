import Navbar from "../components/Navbar/Navbar.jsx";
import Sidebar from "../components/Sidebar/Sidebar.jsx";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
    return (
        <div className="flex h-screen w-screen overflow-hidden bg-[#f5f7fb]">
            {/* Sidebar remains locked at the top */}
            <Sidebar />

            {/* Main Section */}
            <div className="flex flex-col flex-1 h-full overflow-hidden">

                {/* Navbar remains locked at the top*/}
                <Navbar />

                {/* Page content (Only this page scrolls) */}
                <main className="flex-1 overflow-y-auto p-6">
                    <Outlet />
                </main>
                
            </div>
        </div>
    )
}

export default DashboardLayout;