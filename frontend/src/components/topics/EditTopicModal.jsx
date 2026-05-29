
import { updateTopic } from "../../services/topicsService.js";
import TopicForm from "./TopicForm.jsx";
import toast from "react-hot-toast";
import { X } from "lucide-react";

const EditTopicModal = ({ topic, onClose, onTopicUpdated }) => {

    const onSubmit = async (data) => {

        try {

            const updatedTopic = await updateTopic(topic._id, data);

            onTopicUpdated(updatedTopic);

            toast.success("Topic Updated");

            onClose();

        } catch (error) {
            //console.log(error);
            toast.error("Failed to update topic");
        }
    }

    return (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center px-4">

            <div className="w-full max-w-lg bg-white rounded-3xl p-6 shadow-2xl">

                {/* Header */}
                <div className="flex items-center justify-between mb-6">

                    <div>

                        <h2 className="text-2xl font-bold text-gray-900">
                            Edit Topic
                        </h2>

                        <p className="text-sm text-gray-500 mt-1">
                            Update your study topic
                        </p>

                    </div>

                    <button
                        onClick={onClose}
                        className="w-10 h-10 rounded-xl hover:bg-gray-100 flex items-center justify-center cursor-pointer"
                    >

                        <X size={20} />

                    </button>

                </div>

                <TopicForm
                    defaultValues={{
                        title: topic.title,
                        status: topic.status,
                        priority: topic.priority,
                        estimatedMinutes: topic.estimatedMinutes,
                        plannedDate: topic.plannedDate?.split("T")[0] || ""
                    }}
                    submitText="Save Changes"
                    onSubmit={onSubmit}
                />
            </div>
        </div>
    )
}

export default EditTopicModal;