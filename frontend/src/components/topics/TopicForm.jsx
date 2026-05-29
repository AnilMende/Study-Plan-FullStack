import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const topicSchema = z.object({

    title: z
        .string()
        .min(2, "Title must be atleast 2 characters"),

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


const TopicForm = ({ defaultValues, onSubmit, submitText = "Save Topic" }) => {

    const {
        register,
        handleSubmit,
        formState: {
            errors,
            isSubmitting
        }
    } = useForm({

        resolver: zodResolver(topicSchema),

        defaultValues
    });

    return (

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

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

                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Study Time
                    </label>

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
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-blue-700 hover:bg-blue-600 text-white 
                            px-5 py-3 rounded-xl font-medium disabled:opacity-50 cursor-pointer
                        "
                >
                    {
                        isSubmitting
                            ? "Saving..."
                            : submitText
                    }
                </button>

            </div>

        </form>
    )
}

export default TopicForm;