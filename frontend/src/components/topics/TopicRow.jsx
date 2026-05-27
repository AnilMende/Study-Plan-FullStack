import StatusBadge from "./StatusBadge.jsx";
import { CheckCircle2, RotateCcw, Trash2 } from "lucide-react";

const TopicRow = ({ topic, onDelete, onStatusChange }) => {

    return (
        <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">

            {/* Title */}
            <td className="py-4 px-4">
                <div>

                    <p className="font-medium text-gray-900">
                        {topic.title}
                    </p>

                    <p className="text-sm text-gray-500">
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

                <div className="flex items-center gap-3">

                    {/* Completed */}
                    <button
                        onClick={() => onStatusChange(topic._id, "completed")}
                        className="text-green-600 hover:text-green-700 transition-colors cursor-pointer"
                    >
                        <CheckCircle2 size={18} />

                    </button>


                    {/* Revision */}
                    <button
                        onClick={() => onStatusChange(topic._id, "revision")}
                        className="text-purple-600 hover:text-purple-700 transition-colors cursor-pointer"
                    >
                        <RotateCcw size={18} />

                    </button>

                    {/* delete */}
                    <button
                        onClick={() => onDelete(topic._id)}
                        className="text-red-500 hover:text-red-600 transition-colors cursor-pointer"
                    >
                        <Trash2 size={18} />
                    </button>
                </div>
            </td>
        </tr>
    )
}

export default TopicRow;