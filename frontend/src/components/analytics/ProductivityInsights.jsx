import {BookOpen , Target, Clock3, TrendingUp } from "lucide-react";

const ProductivityInsights = ({ insights, completionRate, totalStudyMinutes }) => {

    const cards = [
        {
            title: "Most Studied Subject",
            value: insights?.mostStudiedSubject || "N/A",
            icon: BookOpen,
            iconBg: "bg-blue-100",
            iconColor: "text-blue-600"
        },
        {
            title: "Topics / Day",
            value: insights?.averageTopicsPerDay || 0,
            icon: Target,
            iconBg: "bg-green-100",
            iconColor: "text-green-600"
        },
        {
            title: "Study Hours",
            value: (totalStudyMinutes / 60).toFixed(1),
            icon: Clock3,
            iconBg: "bg-yellow-100",
            iconColor: "text-yellow-600"
        },
        {
            title: "Completion Rate",
            value: `${completionRate}%`,
            icon: TrendingUp,
            iconBg: "bg-purple-100",
            iconColor: "text-purple-600"
        }
    ];

    return (
        <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">

            {/* Header */}
            <div className="mb-6">

                <h3 className="text-lg font-semibold text-gray-900">
                    Productivity Insights
                </h3>

                <p className="text-sm text-gray-500 mt-1">
                    Key study performance metrics
                </p>

            </div>

            {/* Grid */}
            <div className="grid grid-cols-4 gap-4">
                {
                    cards.map((card) => {

                        const Icon = card.icon;

                        return (

                            <div key={card.title} className="p-5 rounded-2xl border border-gray-100 bg-gray-50">

                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4${card.iconBg}`}>

                                    <Icon size={22} className={card.iconColor} />

                                </div>

                                <p className="text-sm text-gray-500">
                                    {card.title}
                                </p>

                                <h4 className="text-2xl font-bold text-gray-900 mt-1">
                                    {card.value}
                                </h4>

                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default ProductivityInsights;