
import dayjs from "dayjs";

const statusStyles = {
    completed: "bg-green-100 text-green-700",
    pending: "bg-gray-100 text-gray-700",
    revision: "bg-yellow-100 text-yellow-700"
};

const DayTopicsPanel = ({
    selectedDate,
    topics,
    statusFilter,
    setStatusFilter
}) => {

    return (

        <div className="bg-white rounded-2xl p-5 border border-gray-100 h-full">

            {/* Header */}
            <div className="flex items-center justify-between mb-5">

                <div>

                    <h2 className="text-lg font-semibold">
                        {dayjs(selectedDate).format(
                            "MMMM D, YYYY"
                        )}
                    </h2>

                    <p className="text-sm text-gray-500 mt-1">
                        {topics.length} topics planned
                    </p>

                </div>

            </div>

            {/* Status Filters */}
            <div className="flex gap-2 mb-6">

                {
                    [
                        "all",
                        "completed",
                        "revision",
                        "pending"
                    ].map((status) => (

                        <button
                            key={status}
                            onClick={() =>
                                setStatusFilter(status)
                            }
                            className={`
                                px-3 py-1.5 rounded-full
                                text-sm font-medium capitalize
                                transition-all
                                ${statusFilter === status
                                    ? "bg-blue-600 text-white"
                                    : "bg-gray-100 text-gray-600"
                                }
                            `}
                        >
                            {status}
                        </button>
                    ))
                }

            </div>

            {/* Topics */}
            <div className="space-y-4">

                {
                    topics.length > 0 ? (

                        topics.map((topic) => (

                            <div
                                key={topic._id}
                                className="
                                    flex items-center justify-between
                                    border border-gray-100
                                    rounded-xl p-4
                                "
                            >

                                <div>

                                    <p className="font-medium text-gray-800">
                                        {topic.title}
                                    </p>

                                    <p className="text-sm text-gray-500 mt-1">
                                        {topic.subjectId?.name}
                                    </p>

                                </div>

                                <span
                                    className={`
                                        px-3 py-1 rounded-full
                                        text-xs font-medium capitalize
                                        ${statusStyles[topic.status]}
                                    `}
                                >
                                    {topic.status}
                                </span>

                            </div>
                        ))

                    ) : (

                        <div
                            className="
                                h-52 flex items-center justify-center
                                text-gray-400 text-sm
                            "
                        >
                            No topics found
                        </div>
                    )
                }

            </div>

        </div>
    );
};

export default DayTopicsPanel;