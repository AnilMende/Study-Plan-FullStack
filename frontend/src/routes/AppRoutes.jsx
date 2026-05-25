import { Routes, Route, BrowserRouter } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout.jsx";
import Dashboard from "../pages/Dashboard.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
import Login from "../pages/auth/Login.jsx";
import Register from "../pages/auth/Register.jsx";
import CalendarPage from "../pages/CalendarPage.jsx";


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
                        index
                        element={<Dashboard />}
                    />

                    <Route
                        path="calendar"
                        element={<CalendarPage />}
                    />

                </Route>

            </Routes>

        </BrowserRouter>
    )
}

export default AppRoutes;