

const StatusDistributionCard = ({ data }) => {


    const total = data.reduce(
        (sum, item) => sum + item.count,
        0
    );

    const statusConfig = {
        completed: {
            label: "Completed",
            color: "bg-green-500"
        },
        pending: {
            label: "Pending",
            color: "bg-yellow-500"
        },
        revision: {
            label: "Revision",
            color: "bg-blue-500"
        }
    };

    return (
        <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">

            <div className="mb-6">

                <h3 className="text-lg font-semibold text-gray-900">
                    Status Distribution
                </h3>

                <p className="text-sm text-gray-500 mt-1">
                    Breakdown of all topics.
                </p>
            </div>

            <div className="space-y-5">
                {
                    data.map((item) => {

                        const percentage = total === 0 ? 0 : Math.round(
                            (item.count / total) * 100
                        );

                        return (
                            <div key={item._id}>

                                <div className="flex justify-between mb-2">

                                    <span className="font-medium text-gray-700">
                                        {
                                            statusConfig[item._id]?.label
                                        }
                                    </span>

                                    <span className="text-sm text-gray-500">
                                        {item.count} Topics
                                    </span>

                                </div>

                                <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">

                                    <div
                                        className={`h-full ${statusConfig[item._id]
                                                ?.color
                                            }`}
                                        style={{
                                            width: `${percentage}%`
                                        }}
                                    />

                                    <div className="text-right text-sm text-gray-500 mt-1">
                                        {percentage}%
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default StatusDistributionCard;