import { useEffect, useState } from "react";
import { getRecentActivity } from "../../services/activityService.js";
import { BookOpen, CheckCircle2, PlusCircle, RefreshCcw } from "lucide-react";


const RecentActivity = ({ refreshKey }) => {

    const [activities, setActivities] = useState([]);

    useEffect(() => {

        fetchActivities();

    }, [refreshKey]);

    const fetchActivities = async () => {

        try {

            const data = await getRecentActivity();

            setActivities(data);

        } catch (error) {
            console.log(error);
        }
    };


    const getIcon = (type) => {

        switch (type) {

            case "completed":
                return (
                    <CheckCircle2
                        size={20}
                        className="text-green-500"
                    />
                );

            case "revision":
                return (
                    <RefreshCcw
                        className="text-yellow-500"
                        size={20}
                    />
                );

            case "subject":
                return (
                    <BookOpen
                        className="text-blue-500"
                        size={20}
                    />
                );

            default:
                return (
                    <PlusCircle
                        className="text-purple-500"
                        size={20}
                    />

                )
        }
    };


    const getMessage = (activity) => {

        switch (activity.type) {

            case "completed":
                return `Completed "${activity.title}"`;

            case "revision":
                return `Revision started for "${activity.title}"`;

            case "subject":
                return `Created subject "${activity.title}"`;

            default:
                return `Created topic "${activity.title}"`;
        }
    };



    return (
        <div className="bg-white rounded-3xl p-6 shadow-sm">

            {/* Header */}
            <div className="flex items-center justify-between mb-6">

                <h2 className="text-xl font-bold">
                    Recent Activity
                </h2>

                <button className="text-blue-600 text-sm font-medium 
                hover:text-blue-700 cursor-pointer">View all →</button>

            </div>

            {/* Activities */}
            <div className="space-y-4">
                {
                    activities.length > 0 ? (

                        activities.map(activity => (

                            <div
                                key={activity.id}
                                className="flex items-start gap-4 p-3 rounded-2xl hover:bg-gray-50 transition"
                            >
                                {/* Icon */}
                                <div className="mt-1">
                                    {
                                        getIcon(activity.type)
                                    }
                                </div>

                                {/* Content */}
                                <div className="flex-1">

                                    <p className="text-sm font-medium text-gray-800">
                                        {
                                            getMessage(activity)
                                        }
                                    </p>

                                    {
                                        activity.subject && (
                                            <p className="text-xs text-gray-500 mt-1">
                                                {
                                                    activity.subject
                                                }
                                            </p>
                                        )
                                    }

                                    <p className="text-xs text-gray-400 mt-1">
                                        {
                                            new Date(activity.time).toLocaleString()
                                        }
                                    </p>

                                </div>

                            </div>
                        ))

                    ) : (

                        <div className="text-center py-10">

                            <p className="text-gray-500">

                                No recent Activity
                            </p>

                        </div>
                    )

                }
            </div>

        </div>
    )
}

export default RecentActivity;