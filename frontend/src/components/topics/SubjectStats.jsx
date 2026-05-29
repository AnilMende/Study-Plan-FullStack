import { BookOpen, CheckCircle2, Clock3, RotateCcw } from "lucide-react";


const statsConfig = [
    {
        key: "total",
        label: "Total Topics",
        icon: BookOpen,
        iconColor: "text-blue-600",
        bgColor: "bg-blue-100"
    },

    {
        key: "completed",
        label: "Completed",
        icon: CheckCircle2,
        iconColor: "text-green-600",
        bgColor: "bg-green-100"
    },

    {
        key: "pending",
        label: "Pending",
        icon: Clock3,
        iconColor: "text-yellow-600",
        bgColor: "bg-yellow-100"
    },

    {
        key: "revision",
        label: "Revision",
        icon: RotateCcw,
        iconColor: "text-purple-600",
        bgColor: "bg-purple-100"
    }
];

const SubjectStats = ({ stats }) => {

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
            {
                statsConfig.map((item) => {

                    const Icon = item.icon;

                    return (

                        <div key={item.key} className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">

                            <div className="flex items-start justify-between">

                                {/* Left */}
                                <div>

                                    <p className="text-sm text-gray-500">
                                        {item.label}
                                    </p>

                                    <h3 className="text-3xl font-bold text-gray-900 mt-2">
                                        {stats[item.key]}
                                    </h3>

                                </div>

                                {/* Right */}
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${item.bgColor}`}>

                                    <Icon size={22} className={item.bgColor} />

                                </div>

                            </div>

                        </div>
                    )
                })
            }
        </div>
    )
}

export default SubjectStats;