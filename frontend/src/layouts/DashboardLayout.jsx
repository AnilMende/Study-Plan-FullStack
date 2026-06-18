import Navbar from "../components/navbar/Navbar.jsx";
import Sidebar from "../components/sidebar/Sidebar.jsx";
import { Outlet } from "react-router-dom";
import { useState } from "react";

const DashboardLayout = () => {

    // for automatic updation
        const [refreshKey, setRefreshKey] = useState(0);
    
        const handleTopicCreated = () => {
            setRefreshKey(prev => prev + 1);
        };
    
    return (
        <div className="flex h-screen w-screen overflow-hidden bg-[#f5f7fb]">
            {/* Sidebar remains locked at the top */}
            <Sidebar />

            {/* Main Section */}
            <div className="flex flex-col flex-1 h-full overflow-hidden">

                {/* Navbar remains locked at the top*/}
                <Navbar onTopicCreated={ handleTopicCreated } />

                {/* Page content (Only this page scrolls) */}
                <main className="flex-1 overflow-y-auto p-6">
                    <Outlet context={{ refreshKey }} />
                </main>
                
            </div>
        </div>
    )
}

export default DashboardLayout;