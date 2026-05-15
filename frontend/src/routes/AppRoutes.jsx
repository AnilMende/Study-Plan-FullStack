import { Routes } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout.jsx";


const AppRoutes = () => {
    return(
        <Routes>
            <Route element={<DashboardLayout/>}>
                <Route path="/" element={}/>
            </Route>

        </Routes>
    )
}

export default AppRoutes;