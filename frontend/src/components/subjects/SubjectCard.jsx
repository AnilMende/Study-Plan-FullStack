
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import SubjectProgressBar from "./SubjectProgressBar.jsx";

const SubjectCard = ({ subject }) => {

    const {
        _id,
        name,
        totalTopics = 0,
        progress = 0,
        color = "#3B82F6",
    } = subject;


    return (
        <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm 
        hover:shadow-md hover:-translate-y-1 transition-all duration-300">

            {/* Icon */}
            <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5"
                style={{
                    backgroundColor: `${color}20`
                }}
            >
                <div
                    className="text-2xl"
                    style={{ color }}
                >
                    {"📘"}
                </div>

            </div>

            {/* Subject name */}
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
                {name}
            </h2>

            {/* progress */}
            <div className="space-y-2 mb-5">

                <div className="flex items-center justify-between text-sm">

                    <span className="text-gray-500">
                        Progress
                    </span>

                    <span className="font-medium text-gray-700">
                        {progress}%
                    </span>

                </div>

                <SubjectProgressBar
                    progress={progress}
                    color={color}
                />

            </div>

            {/* Footer */}
            <div className="flex items-center justify-between">

                <div>
                    <p className="text-xs text-gray-400">
                        Total topics
                    </p>

                    <p className="font-semibold text-gray-800">
                        {totalTopics}
                    </p>
                </div>

                <Link to={`/subjects/${_id}`}
                    className="flex items-center gap-1 text-sm font-medium text-blue-600 
                    hover:text-blue-700 transition-colors"
                >
                    View Topics
                    <ArrowRight size={16} />
                </Link>

            </div>
        </div>
    )
}

export default SubjectCard;