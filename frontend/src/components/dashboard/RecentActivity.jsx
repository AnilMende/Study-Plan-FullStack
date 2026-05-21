import ActivityItem from "./ActivityItem";

const activities = [
    {
        type: "completed",
        topic: "Graph BFS",
        subject: "Data Structures",
        time: "2 mins ago"
    },
    {
        type: "revision",
        topic: "SQL Joins",
        subject: "DBMS",
        time: "1 hour ago"
    },
    {
        type: "completed",
        topic: "OSI Model",
        subject: "Computer Networks",
        time: "3 hours ago"
    }
];

const RecentActivity = ({ refreshKey }) => {
    return (
        <div className="bg-white rounded-2xl border border-gray-200 p-6">

            {/* Header */}
            <div className="flex items-center justify-between mb-4">

                <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>

                <button className="text-blue-600 text-sm font-medium 
                hover:text-blue-700 cursor-pointer">View all →</button>

            </div>

            {/* Activity List */}
            <div>
                {
                    activities.map((activity, index) => (

                        <ActivityItem
                            key={index}
                            {...activity}
                        />
                    ))
                }
            </div>

        </div>
    )
}

export default RecentActivity;