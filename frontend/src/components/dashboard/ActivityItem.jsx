import { CheckCircle2, RefreshCw } from "lucide-react";


const ActivityItem = ({ type, topic, subject, time }) => {

    const isCompleted = type === "completed";

    return (
        <div className="flex items-center justify-between py-4 border-b border-gray-100 last:border-none">

            {/* Left */}
            <div className="flex items-center gap-4">

                {/* Icon */}
                <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center
                    ${isCompleted
                            ? "bg-green-100"
                            : "bg-blue-100"

                        }`}
                >
                    {
                        isCompleted ? (
                            <CheckCircle2
                                size={20}
                                className="text-green-600"
                            />
                        ) : (
                            <RefreshCw
                                size={18}
                                className="text-blue-600"
                            />
                        )
                    }
                </div>

                {/* Content */}
                <div>

                    <p className="text-sm text-gray-800">
                        {isCompleted ? (
                            <>
                                Completed{" "}
                                <span className="font-semibold">
                                    "{topic}"
                                </span>{" "}
                                in{" "}
                                <span className="text-blue-600 font-medium">
                                    {subject}
                                </span>
                            </>
                        ) : (
                            <>
                                Revised{" "}
                                <span className="font-semibold">
                                    "{topic}"
                                </span>{" "}
                                in{" "}
                                <span className="text-blue-600 font-medium">
                                    {subject}
                                </span>
                            </>
                        )}
                    </p>

                </div>

            </div>

            {/* Time */}
            <span className="text-sm text-gray-400 whitespace-nowrap">{time}</span>
            
        </div>
    )
}

export default ActivityItem;