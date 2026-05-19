import { Routes, Route, BrowserRouter } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout.jsx";
import Dashboard from "../pages/Dashboard.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
import Login from "../pages/auth/Login.jsx";
import Register from "../pages/auth/Register.jsx";


const AppRoutes = () => {
    return (
        <BrowserRouter>

            <Routes>

                {/* Login is Public */}
                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/register"
                    element={<Register />}
                />

                {/* Dashboard should be protected */}
                <Route element={
                    <ProtectedRoute>
                        <DashboardLayout />
                    </ProtectedRoute>
                }>
                    <Route
                        path="/"
                        element={<Dashboard />}
                    />

                </Route>

            </Routes>

        </BrowserRouter>
    )
}

export default AppRoutes;