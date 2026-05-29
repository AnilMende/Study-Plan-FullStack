import EditTopicModal from "./EditTopicModal.jsx";
import StatusBadge from "./StatusBadge.jsx";
import { CheckCircle2, Edit2, RotateCcw, SquarePen, Trash2 } from "lucide-react";
import { useState } from "react";



const TopicRow = ({ topic, onDelete, onStatusChange, onTopicEdit }) => {

    const [openModal, setOpenModal] = useState(false);

    return (
        <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">

            {/* Title */}
            <td className="py-4 px-4">
                <div>

                    <p className="font-medium text-gray-900">
                        {topic.title}
                    </p>

                    <p className="text-sm text-gray-700">
                        {topic.priority} priority
                    </p>

                </div>
            </td>

            {/* Status */}
            <td className="py-4 px-4">
                <StatusBadge status={topic.status} />
            </td>

            {/* Planned date */}
            <td className="py-4 px-4 text-sm text-gray-600">
                {
                    topic.plannedDate ? new Date(topic.plannedDate).toLocaleDateString() : "-"
                }
            </td>

            {/* revision count */}
            <td className="py-4 px-4 text-sm text-gray-600">
                {topic.revisionCount}
            </td>

            {/* Actions */}
            <td className="py-4 px-4">

                <div className="flex items-center gap-2">

                    {/* Completed */}
                    <button
                        onClick={() => onStatusChange(topic._id, "completed")}
                        className="w-9 h-9 rounded-lg flex items-center justify-center 
                        text-green-500 hover:text-green-600 hover:bg-green-50 transition-colors cursor-pointer"
                        title="Completed"
                    >
                        <CheckCircle2 size={18} />

                    </button>


                    {/* Revision */}
                    <button
                        onClick={() => onStatusChange(topic._id, "revision")}
                        className="w-9 h-9 rounded-lg flex items-center justify-center
                        text-purple-500 hover:text-purple-600 hover:bg-purple-50 transition-colors cursor-pointer"
                        title="Revise Topic"
                    >
                        <RotateCcw size={18} />

                    </button>

                    {/* delete */}
                    <button
                        onClick={() => onDelete(topic._id)}
                        className="w-9 h-9 rounded-lg flex items-center justify-center 
                        text-red-500 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                        title="Delete Topic"
                    >
                        <Trash2 size={18} />
                    </button>

                    {/* Edit button */}
                    <button onClick={() => setOpenModal(true)}
                        className="w-9 h-9 rounded-lg flex items-center justify-center 
                        text-amber-500 hover:text-amber-600 hover:bg-amber-50 transition-all cursor-pointer"
                        title="Edit Topic"
                    >
                        <SquarePen size={18} />
                    </button>
                </div>
                {
                    openModal && (
                        <EditTopicModal
                            topic={topic}
                            onClose={() => setOpenModal(false)}
                            onTopicUpdated={onTopicEdit}
                        />
                    )
                }
            </td>
        </tr>
    )
}

export default TopicRow;