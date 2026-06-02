
import { CheckCircle2 } from "lucide-react";
import { formatDistanceToNow, formatDistanceToNowStrict } from "date-fns";

const Revisionrow = ({ topic, onMarkRevised }) => {


    // const formatDate = (date) => {

    //     if (!date) return "Never";

    //     return new Date(date).toLocaleDateString();
    // };

    return (
        <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">

            {/* Topic */}
            <td className="px-6 py-4">

                <p className="font-medium text-gray-800">
                    {topic.title}
                </p>

            </td>

            {/* Subject */}
            <td className="px-6 py-4">

                <span className="px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-700">
                    {topic.subjectId?.name}
                </span>

            </td>

            {/* Revision Count */}
            <td className="px-6 py-4">

                <span className="font-semibold text-gay-700">
                    {topic.revisionCount}
                </span>

            </td>

            {/* Last revised */}
            <td className="px-6 py-4 text-gray-600">
                {
                    topic.lastRevisedDate
                        ? formatDistanceToNow(new Date(topic.lastRevisedDate), { addSuffix: true })
                        : "Never"
                }
            </td>

            {/* Action */}
            <td className="px-6 py-4">

                <div className="flex justify-center">

                    <button
                        onClick={
                            () => onMarkRevised(topic._id)
                        }

                        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-green-600 hover:bg-green-700
                        text-white text-sm transition-all cursor-pointer"
                    >

                        <CheckCircle2 size={16} />

                        Mark Revised
                    </button>
                </div>
            </td>
        </tr>
    )
}

export default Revisionrow;