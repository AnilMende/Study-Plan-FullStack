import PlanItem from "./PlanItem";

const plans = [
    {
        title: "Graph Algorithms",
        status: "completed"
    },
    {
        title: "Dynamic Programming",
        status: "pending"
    },
    {
        title: "SQL Joins",
        status: "pending"
    },
    {
        title: "Normalization",
        status: "pending"
    }
];

const TodaysPlan = ({ refreshKey }) => {
    return (
        <div className="bg-white rounded-2xl border border-gray-200 p-6">

            {/* Header */}
            <div className="flex items-center justify-between mb-6">

                <div>

                    <h3 className="text-lg font-semibold text-gray-900">
                        Today's Plan
                    </h3>

                    <p className="text-sm text-gray-400 mt-1">Mar 12, 2026</p>

                </div>

            </div>

            {/* Plan Items */}
            <div>

                {
                    plans.map((plan, index) => (

                        <PlanItem
                            key={index}
                            {...plan}
                        />
                    ))

                }
            </div>

            {/* footer */}
            <button className="mt-6 text-blue-600 text-sm font-medium hover:text-blue-700 
            transition-all">
                View full plan →
            </button>
            
        </div>
    )
}

export default TodaysPlan;