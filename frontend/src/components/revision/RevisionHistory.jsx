import { formatDistanceToNow } from "date-fns";


const RevisionHistory = ({ topics }) => {

    const history = topics.filter(

        (topic) => topic.lastRevisedDate

    )
        .sort(
            (a, b) =>
                new Date(
                    b, lastRevisedDate
                ) -
                new Date(
                    a.lastRevisedDate
                )
        )
        .slice(0, 8);

    return (
        <div className="bg-white rounded-2xl p-6 border border-gray-200">

            <h3 className="text-lg font-semibold mb-6">
                Revision History
            </h3>

            <div className="space-y-5">
                {
                    history.map((topic) => (

                        <div
                            key={topic._id}
                            className="flex gap-3"
                        >

                            <div className="w-3 h-3 rounded-full bg-blue-500 mt-2" />

                            <div>

                                <p className="font-medium text-gray-800">
                                    {topic.title}
                                </p>

                                <p className="text-sm text-gray-400">
                                    {
                                        formatDistanceToNow(
                                            new Date(
                                                topic.lastRevisedDate
                                            ),
                                            {
                                                addSuffix: true
                                            }
                                        )
                                    }
                                </p>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default RevisionHistory;