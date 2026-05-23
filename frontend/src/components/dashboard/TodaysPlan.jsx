import { useEffect, useState } from "react";
import { getTopicsByDate, updateTopicStatus } from "../../services/topicsService.js";
import { CheckCircle2 } from "lucide-react";


const TodaysPlan = ({ refreshKey }) => {

    const [topics, setTopics] = useState([]);

    const [loading, setLoading] = useState(true);

    const today = new Date().toISOString().split("T")[0];


    useEffect(() => {

        fetchTodayTopics();

    }, [refreshKey]);


    const fetchTodayTopics = async () => {

        try {

            setLoading(true);

            const data = await getTopicsByDate(today);

            setTopics(data);

        } catch (error) {

            console.log(error);

        } finally {
            setLoading(false);
        }
    };

    // toggle complete
    const handleComplete = async (topicId) => {

        try {

            await updateTopicStatus(topicId, "completed");

            setTopics(prev =>

                prev.map(topic =>

                    topic._id === topicId
                        ? {
                            ...topic,
                            status: "completed"
                        }

                        : topic
                )
            );

        } catch (error) {

            console.log(error);
        }
    }


    return (
        <div className="bg-white rounded-2xl border border-gray-200 p-6">

            {/* Header */}
            <div className="flex items-center justify-between mb-6">

                <div>

                    <h3 className="text-lg font-semibold text-gray-900">
                        Today's Plan
                    </h3>

                    <span className="text-sm text-gray-500">
                        { topics.length} Tasks
                    </span>

                </div>

                {/* Loading */}
                {
                    loading ? (
                        <p className="text-gray-500">
                            Loading...
                        </p>
                    ) : (

                        <div className="space-y-4">
                            {
                                topics.length > 0 ? (

                                    topics.map(topic => (

                                        <div
                                            key={topic._id}
                                            className="flex items-center justify-between border 
                                            border-gray-100 rounded-2xl p-4"
                                        >

                                            {/* Left */}
                                            <div className="flex items-center gap-4">

                                                {/* Checkbox on click the topic will be marked as completed */}
                                                <button onClick={() => handleComplete(topic._id)}>

                                                    <CheckCircle2
                                                        size={22}
                                                        className={
                                                            topic.status === "completed"

                                                                ? "text-green-500"

                                                                : "text-gray-300"
                                                        }
                                                    />
                                                </button>

                                                {/* Content */}
                                                <div>

                                                    <h3
                                                        className={`font-medium ${topic.status === "completed"

                                                            ? "text-green-400"

                                                            : ""
                                                            }`}
                                                    >
                                                        {topic.title}
                                                    </h3>

                                                    <p className="text-sm text-gray-500">
                                                        {
                                                            topic.subjectId?.name
                                                        }
                                                    </p>

                                                </div>

                                            </div>

                                            {/* Right */}
                                            <div className="flex items-center gap-3">

                                                {/* Priority */}
                                                <span
                                                    className={`
                                                px-3 py-1 rounded-full text-xs font-medium

                                                ${topic.priority === "high"

                                                            ? "bg-red-100 text-red-600"

                                                            : topic.priority === "medium"

                                                                ? "bg-yellow-100 text-yellow-700"

                                                                : "bg-green-100 text-green-600"
                                                        }
                                            `}>
                                                    {
                                                        topic.priority
                                                    }
                                                </span>

                                                {/* Minutes */}
                                                <span className="text-sm text-gray-500">
                                                    {
                                                        topic.estimatedMinutes
                                                    } min
                                                </span>

                                            </div>

                                        </div>
                                    ))
                                ) : (

                                    <div className="text-center py-12">

                                        <p className="text-gray-500">

                                            No topics planned today

                                        </p>

                                    </div>
                                )
                            }
                        </div>
                    )
                }

            </div>

        </div>
    )
}

export default TodaysPlan;