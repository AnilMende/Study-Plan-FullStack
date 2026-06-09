import toast from "react-hot-toast";
import { changePassword } from "../../services/authService.js";
import { ShieldCheck } from "lucide-react";
import { useForm } from "react-hook-form";

const SecuritySettings = () => {

    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: {
            errors,
            isSubmitting
        }
    } = useForm();

    const newPassword = watch("newPassword");

    const onSubmit = async (data) => {

        try {

            await changePassword({
                currentPassword: data.currentPassword,
                newPassword: data.newPassword
            });

            toast.success("Password updated successfully");

            reset();

        } catch (error) {

            toast.error(
                error?.response?.data?.message ||
                "Failed to update password"
            );

        }
    };

    return (
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
            {/* Header */}
            <div className="flex items-center gap-3 mb-6">

                <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                    <ShieldCheck
                        size={20}
                        className="text-green-600"
                    />
                </div>

                <div>

                    <h2 className="text-lg font-semibold text-gray-900">
                        Security Settings
                    </h2>

                    <p className="text-sm text-gray-500">
                        Update your password
                    </p>

                </div>

            </div>

            {/* form */}
            <form
                onSubmit={
                    handleSubmit(onSubmit)
                }
                className="space-y-5"
            >
                {/* Current Password */}
                <div>

                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Current Password
                    </label>

                    <input
                        type="password"
                        {...register(
                            "currentPassword",
                            {
                                required:
                                    "Current password is required"
                            }
                        )}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 
                        focus:ring-blue-500 outline-none"
                    />
                    {
                        errors.currentPassword && (

                            <p
                                className="text-red-500 text-sm mt-1"
                            >
                                {
                                    errors.currentPassword.message
                                }
                            </p>
                        )
                    }

                </div>

                {/* New Password */}
                <div>

                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        New Password
                    </label>

                    <input
                        type="password"
                        {...register(
                            "newPassword",
                            {
                                required:
                                    "New password is required",
                                minLength: {
                                    value: 6,
                                    message:
                                        "Minimum 6 characters"
                                }
                            }
                        )}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 
                        focus:ring-blue-500 outline-none"
                    />
                    {
                        errors.newPassword && (

                            <p
                                className="text-red-500 text-sm mt-1"
                            >
                                {
                                    errors.newPassword.message
                                }
                            </p>
                        )
                    }

                </div>

                {/* Confirm Password */}
                <div>

                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Confirm Password
                    </label>

                    <input
                        type="password"
                        {...register(
                            "confirmPassword",
                            {
                                required:
                                    "Please confirm password",
                                validate:
                                    (value) =>
                                        value ===
                                        newPassword ||
                                        "Passwords do not match"
                            }
                        )}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 
                        focus:ring-blue-500 outline-none"
                    />
                    {
                        errors.confirmPassword && (

                            <p
                                className="text-red-500 text-sm mt-1"
                            >
                                {
                                    errors.confirmPassword.message
                                }
                            </p>
                        )
                    }

                </div>

                {/* Submit */}
                <div
                    className="
                        flex
                        justify-end
                    "
                >

                    <button
                        type="submit"
                        disabled={
                            isSubmitting
                        }
                        className="px-5 py-3 rounded-xl bg-blue-600 text-white 
                        hover:bg-blue-700 transition disabled:opacity-50 cursor-pointer"
                    >
                        {
                            isSubmitting
                                ? "Updating..."
                                : "Update Password"
                        }
                    </button>

                </div>


            </form>
        </div>
    )
}

export default SecuritySettings;