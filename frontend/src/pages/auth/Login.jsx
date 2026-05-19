import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import { useState } from "react";
import { loginUser } from "../../services/authService.js";
import toast from "react-hot-toast";

const Login = () => {

    const navigate = useNavigate();

    const { setUser } = useAuth();

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            setLoading(true);

            const response = await loginUser(formData);

            setUser(response.data.user);

            toast.success("Logged in successfully");

            navigate("/");

        } catch (error) {

            // console.log(error);
            toast.error("Invalid email or password");

            alert(error?.response?.data?.message);
        } finally {
            setLoading(false);
        }

    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#f5f7fb]">

            <form onSubmit={handleSubmit}
                className="w-full max-w-md bg-white p-8 rounded-2xl border border-gray-200">

                <h1 className="text-3xl font-bold mb-8 text-center">Login</h1>

                {/* Email */}
                <div className="mb-5">

                    <label className="block mb-2 text-sm font-medium">Email</label>

                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter email"
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                    />

                </div>

                {/* Password */}
                <div className="mb-6">

                    <label className="block mb-2 text-sm font-medium">Password</label>

                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Enter password"
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Login button */}
                {/* button is disable when the loading is false */}
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl 
                    font-semibold transition-all"
                >
                    {
                        loading ? "Loading in..." : "Login"
                    }
                </button>

                <p className="text-center text-sm text-gray-500 mt-2">
                    Don't have an account?{" "}
                    <Link to="/register" className="text-blue-600 font-medium hover:underline">
                        Register Here
                    </Link>
                </p>

            </form>

        </div>
    )
}

export default Login;