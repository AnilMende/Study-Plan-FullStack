import { Routes, Route, BrowserRouter } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout.jsx";
import Dashboard from "../pages/Dashboard.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
import Login from "../pages/auth/Login.jsx";
import Register from "../pages/auth/Register.jsx";
import CalendarPage from "../pages/CalendarPage.jsx";
import SubjectsPage from "../pages/SubjectsPage.jsx";
import SubjectDetailsPage from "../pages/SubjectDetailsPage.jsx";
import AnalyticsPage from "../pages/AnalyticsPage.jsx";
import RevisionPage from "../pages/RevisionPage.jsx";
import StreakPage from "../pages/StreakPage.jsx";


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
                        path="/subjects"
                        element={<SubjectsPage />}
                    />

                    <Route
                        path="/subjects/:subjectId"
                        element={<SubjectDetailsPage />}
                    />

                    <Route
                        path="/revision"
                        element={<RevisionPage />}
                    />

                    <Route
                        path="/streak"
                        element={<StreakPage />}
                    />

                    <Route
                        path="/calendar"
                        element={<CalendarPage />}
                    />

                    <Route
                        path="/analytics"
                        element={<AnalyticsPage />}
                    />

                </Route>

            </Routes>

        </BrowserRouter>
    )
}

export default AppRoutes;