import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../services/authService";

const Register = () => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({ name: "", email: "", password: "" });

    const handleChange = async (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    }

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const response = await registerUser(formData);

            setFormData(response.data.user);

            navigate("/login");

        } catch (error) {
            console.log(error);
            navigate("/register");
        }
    }

    return (
        <div>

            <form onSubmit={handleSubmit}>

                <h1>Register</h1>

                {/* username */}
                <div>
                    <label >Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter name" />

                </div>

                {/* Email */}
                <div>
                    <label >Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter email" />
                </div>

                {/* Password */}
                <div>
                    <label >Password</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Enter password" />
                </div>

                {/* Registe button */}
                <button type="submit" navigate="/login">Register</button>


            </form>
        </div>
    )
}

export default Register;