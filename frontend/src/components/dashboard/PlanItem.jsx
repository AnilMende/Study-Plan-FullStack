
import { CheckCircle2, Circle } from "lucide-react";

const PlanItem = ({ title, status }) => {

    const isCompleted = status === "completed";

    return (
        <div className="flex items-center justify-between py-4 border-b border-gray-100 last:border-none">

            {/* Left */}
            <div className="flex items-center gap-3">

                {/* Status Icon */}
                <div>
                    {
                        isCompleted ? (
                            <CheckCircle2
                                size={22}
                                className="text-green-500"
                            />
                        ) : (
                            <Circle
                                size={22}
                                className="text-gray-300"
                            />
                        )
                    }

                </div>

                {/* Title */}
                <h4 className="font-medium text-gray-800">{title}</h4>

            </div>

            {/* Status */}
            <span
                className={`text-sm font-medium 
                ${isCompleted ? "text-green-500" : "text-gray-400"
                    }`}
            >
                {isCompleted ? "completed" : "pending"}
            </span>
        </div>
    )
}

export default PlanItem;