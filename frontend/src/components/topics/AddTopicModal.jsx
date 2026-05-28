
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { X } from "lucide-react";

import { createTopic } from "../../services/topicsService.js";

import toast from "react-hot-toast";

const topicSchema = z.object({

    title: z
        .string()
        .min(2, "Title must be atleast two characters"),

    status: z.enum([
        "pending",
        "completed",
        "revision"
    ]),

    priority: z.enum([
        "low",
        "medium",
        "high"
    ]),

    estimatedMinutes: z.coerce
        .number()
        .min(1, "Minimum 1 minute"),

    plannedDate: z.string().optional()

});

const AddTopicModal = ({ subjectId, onClose, onTopoicCreated }) => {

    const {
        register,
        handleSubmit,
        reset,
        formState: {
            errors,
            isSubmitting
        }
    } = useForm({

        resolver: zodResolver(topicSchema),

        defaultValues: {
            status: "pending",
            priority: "medium",
            estimatedMinutes: 30
        }
    });


    const onSubmit = async (data) => {

        try {

            const payload = { ...data, subjectId };

            const newTopic = await createTopic(payload);

            onTopoicCreated(newTopic);

            toast.success("Topic created successfully");

            reset();

            onClose();

        } catch (error) {
            console.log(error);
        }
    };


    return (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center px-4">

            {/* Modal */}
            <div className="w-full max-w-lg bg-white rounded-3xl p-6 shadow-2xl">

                {/* Header */}
                <div className="flex items-center justify-between mb-6">

                    <div>

                        <h2 className="text-2xl font-bold text-gray-900">
                            Add Topic
                        </h2>

                        <p className="text-sm text-gray-500 mt-1">
                            Create new study topic...
                        </p>

                    </div>

                    <button onClick={onClose}
                        className="w-10 h-10 rounded-xl hover:bg-gray-100 
                        flex items-center justify-center cursor-pointer">
                        <X size={20} />
                    </button>

                </div>

                {/* Form */}
                <form onSubmit={handleSubmit(onSubmit)}>

                    {/* Title */}
                    <div>

                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Topic Title
                        </label>

                        <input
                            type="text"
                            placeholder="Enter topic title"
                            {...register("title")}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 
                        outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        {
                            errors.title && (
                                <p className="text-sm text-red-500 mt-2">
                                    {error.title.message}
                                </p>
                            )
                        }

                    </div>

                    {/* Proirity */}
                    <div className="mt-2">

                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Priority
                        </label>

                        <select
                            {...register("priority")}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 
                                outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="low">
                                Low
                            </option>

                            <option value="medium">
                                Medium
                            </option>

                            <option value="high">
                                High
                            </option>

                        </select>

                    </div>

                    {/* Row */}
                    <div className="grid grid-cols-2 gap-4 mt-2">

                        {/* Planned Date */}
                        <div>

                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Planned Date
                            </label>

                            <input
                                type="date"
                                {...register("plannedDate")}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none 
                                focus:ring-2 focus:ring-blue-500"
                            />

                        </div>

                        {/* Estimated Minutes */}
                        <div>

                            <label htmlFor="">Study Time</label>

                            <input
                                type="number"
                                {...register("estimatedMinutes")}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none 
                                focus:ring-2 focus:ring-blue-500"
                            />

                        </div>

                    </div>

                    {/* Footer */}
                    <div className="mt-2">

                        <button
                            type="button"
                            onClick={onClose}
                            className="px-5 py-3 mr-6 rounded-xl border border-gray-200 
                            hover:bg-gray-100 cursor-pointer"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="bg-blue-700 hover:bg-blue-600 text-white 
                            px-5 py-3 rounded-xl font-medium disabled:opacity-50 cursor-pointer
                        "
                        >
                            {
                                isSubmitting
                                    ? "Creating..."
                                    : "Create Topic"
                            }
                        </button>

                    </div>

                </form>

            </div>

        </div>
    )
}

export default AddTopicModal;