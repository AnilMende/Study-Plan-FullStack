import { Routes } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout.jsx";
import Dashboard from "../pages/Dashboard.jsx";


const AppRoutes = () => {
    return(
        <Routes>
            
            <Route element={<DashboardLayout/>}>
                <Route path="/" element={<Dashboard/>}/>
            </Route>

        </Routes>
    )
}

export default AppRoutes;