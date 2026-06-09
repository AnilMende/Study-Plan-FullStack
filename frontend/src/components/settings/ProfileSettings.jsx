
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { getProfile, updateProfile } from "../../services/userService.js";
import toast from "react-hot-toast";
import { User } from "lucide-react";

const ProfileSettings = () => {


    const {
        register,
        handleSubmit,
        reset,
        formState: {
            errors,
            isDirty
        }
    } = useForm();

    const [loading, setLoading] = useState(true);

    const [saving, setSaving] = useState(false);

    useEffect(() => {

        const fetchProfile = async () => {

            try {

                const data = await getProfile();

                reset({
                    name: data.name,
                    email: data.email
                });

            } catch (error) {
                toast.error("Failed to load profile");
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();

    }, [reset]);


    const onSubmit = async (data) => {

        try {
            setSaving(true);

            await updateProfile(data);

            toast.success("Profile Updated");

        } catch (error) {

            toast.error("Failed to update profile");

        } finally {

            setSaving(false);

        }
    };

    if (loading) {

        return (
            <div className="bg-white rounded-xl p-6 border border-gray-200">
                Loading...
            </div>
        );
    }

    return (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">

            {/* Header */}
            <div className="mb-6">

                <h2 className="text-sl font-semibold text-gray-900">
                    Profile Settings
                </h2>

                <p className="text-sm text-gray-500">
                    Manage your account information
                </p>
            </div>

            {/* Avatar */}
            <div className="flex items-center gap-4 mb-8">

                <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
                    <User
                        size={30}
                        className="text-blue-600"
                    />
                </div>

                <div>
                    <p
                        className="font-medium text-gray-900"
                    >
                        Profile Picture
                    </p>

                    <p
                        className="text-sm text-gray-500"
                    >
                        Avatar upload coming soon
                    </p>

                </div>

            </div>

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-5"
            >
                {/* Name */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Name
                    </label>
                    <input
                        {...register(
                            "name",
                            {
                                required: "Name is required"
                            }
                        )}

                        className="w-full px-4 py-3 rounded-xl border border-gray-200 
                        focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {
                        errors.name && (
                            <p className="text-red-500 text-sm mt-1">
                                {
                                    errors.name.message
                                }
                            </p>
                        )
                    }

                </div>

                {/* Email */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email
                    </label>
                    <input
                        {...register(
                            "email",
                            {
                                required: "Email is required"
                            }
                        )}

                        className="w-full px-4 py-3 rounded-xl border border-gray-200 
                        focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {
                        errors.email && (

                            <p className="text-red-500 text-sm mt-1">
                                {
                                    errors.email.message
                                }
                            </p>
                        )
                    }
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-3 pt-4">
                    <button type="button"
                        onClick={() => reset()}
                        className="px-5 py-2.5 rounded-xl border border-gray-200 
                        hover:bg-gray-300 cursor-pointer"
                    >
                        Cancel
                    </button>

                    <button
                        type="submit"
                        disabled={
                            saving ||
                            !isDirty
                        }
                        className="px-5 py-2.5 rounded-xl bg-blue-500 text-white 
                        hover:bg-blue-800 cursor-pointer"
                    >
                        {
                            saving
                                ? "Saving..."
                                : "Save Changes"
                        }
                    </button>

                </div>
            </form>
        </div>
    )
}

export default ProfileSettings;