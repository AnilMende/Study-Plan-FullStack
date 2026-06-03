

const RevisionInsights = ({ topics }) => {

    const totalRevisions =
        topics.reduce(
            (sum, topic) =>
                sum + topic.revisionCount,
            0
        );

    const avgRevision =
        topics.length
            ? (
                totalRevisions / topics.length
            ).toFixed(1)
            : 0;

    const mostRevised =
        topics.length
            ? topics.reduce(
                (max, topic) =>
                    topic.revisionCount >
                        max.revisionCount
                        ? topic
                        : max
            )
            : null;


    const neverRevised =
        topics.filter(
            (topic) =>
                topic.revisionCount === 0
        ).length;

    return (
        <div className="bg-white rounded-2xl p-6 border border-gray-200">

            <h3
                className="text-lg font-semibold mb-6"
            >
                Revision Insights
            </h3>

            <div className="space-y-4">

                <div>

                    <p className="text-sm text-gray-500">
                        Most Revised Topic
                    </p>

                    <p className="font-semibold text-gray-800">
                        {
                            mostRevised?.title ||
                            "-"
                        }
                    </p>

                </div>

                <div>

                    <p
                        className="text-sm text-gray-500"
                    >
                        Average Revisions
                    </p>

                    <p
                        className="font-semibold text-gray-800"
                    >
                        {avgRevision}
                    </p>

                </div>

                <div>

                    <p
                        className="text-sm text-gray-500"
                    >
                        Never Revised
                    </p>

                    <p
                        className="font-semibold text-gray-800"
                    >
                        {neverRevised}
                    </p>

                </div>
            </div>
        </div>
    )
}

export default RevisionInsights;