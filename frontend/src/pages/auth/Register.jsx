import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../services/authService";
import toast from "react-hot-toast";

const Register = () => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({ name: "", email: "", password: "" });

    const handleChange = async (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await registerUser(formData);

            toast.success("Registered Successfully");

            navigate("/login");

        } catch (error) {
            // console.log(error);
            toast.error("Registration failed");
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#f5f7fb]">

            <form
                onSubmit={handleSubmit}
                className="w-full max-w-md bg-white p-8 rounded-2xl border border-gray-200"
            >

                <h1 className="text-3xl font-bold mb-8 text-center">Register</h1>

                {/* username */}
                <div className="mb-5">
                    <label className="block mb-2 text-sm font-medium">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Name"
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                    />

                </div>

                {/* Email */}
                <div className="mb-5">
                    <label className="block mb-2 text-sm font-medium">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email"
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Password */}
                <div className="mb-5">
                    <label className="block mb-2 text-sm font-medium">Password</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Password"
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Registe button */}
                <button
                    type="submit"
                    navigate="/login"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl 
                    font-semibold transition-all"
                >
                    Register
                </button>

                <p className="text-center text-sm text-gray-500 mt-2">
                    Already Have an Account?{" "}
                    <Link to="/login" className="text-blue-600 font-medium hover:underline">
                        Login
                    </Link>
                </p>
            </form>
        </div>
    )
}

export default Register;