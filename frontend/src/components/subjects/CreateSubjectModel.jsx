import { X } from "lucide-react";
import { createSubject } from "../../services/subjectService";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";


const subjectSchema = z.object({
    name: z
        .string()
        .min(2, "Subject name must be at least 2 characters")
        .max(40, "Subject name is too long")
});


const CreateSubjectModel = ({ onClose, onSubjectCreated }) => {

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting }
    } = useForm({
        resolver: zodResolver(subjectSchema)
    });


    const onSubmit = async (data) => {

        try {

            const response = await createSubject(data);

            onSubjectCreated(response);

            reset();

            onClose();

        } catch (error) {

            console.log(error);

        }
    };

    return (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center px-4">

            {/* Modal */}
            <div className="w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl animate-in fade-in zoom-in-95">

                {/* Header */}
                <div className="flex items-center justify-between mb-6">

                    <div>

                        <h2 className="text-2xl font-bold text-gray-900 mb-2">
                            Create Subject
                        </h2>

                        <p className="text-sm text-gray-500 mt-1">
                            Add a new subject to organize your topics.
                        </p>

                    </div>

                    <button onClick={onClose} className="w-10 h-10 rounded-xl hover:bg-gray-100 
                    flex items-center justify-center transition-colors cursor-pointer">
                        <X size={20} />
                    </button>

                </div>

                {/* Form */}
                <form onSubmit={handleSubmit(onSubmit)}>

                    {/* Subject name */}
                    <div>

                        <label className="block text-sm font-medium text-gray-700 mb-3">
                            Subject Name
                        </label>

                        <input
                            type="text"
                            placeholder="Enter subject name"
                            {...register("name")}
                            className="
                            w-full
                            px-4 py-3
                            rounded-xl
                            border border-gray-200
                            outline-none
                            focus:ring-2
                            focus:ring-blue-500
                            "
                        />

                        {
                            errors.name && (
                                <p className="text-sm text-red-500 mt-2">
                                    {errors.name.message}
                                </p>
                            )
                        }

                    </div>

                    {/* Actions */}
                    <div className="flex justify-end gap-3 pt-2">

                        <button type="button" onClick={onClose} className="px-5 py-3 rounded-xl border 
                        border-gray-200 hover:bg-gray-100 transition-colors cursor-pointer">
                            Cancel
                        </button>

                        <button type="submit" disabled={isSubmitting}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-5 
                        py-3 rounded-xl font-medium transition-colors disabled:opacity-50 cursor-pointer">
                            {
                                isSubmitting ? "Creating..." : "Create Subject"
                            }
                        </button>

                    </div>

                </form>

            </div>

        </div>
    )
}

export default CreateSubjectModel;