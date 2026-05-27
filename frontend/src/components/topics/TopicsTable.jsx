import TopicRow from "./TopicRow.jsx";


const TopicsTable = ({ topics, onDelete, onStatusChange }) => {

    return (
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">

            <table className="w-full">

                <thead className="bg-gray-50 border-b border-gray-100">

                    <tr className="text-left text-sm text-gray-500">

                        <th className="py-4 px-4 font-medium">
                            Topic
                        </th>

                        <th className="py-4 px-4 font-medium">
                            Status
                        </th>

                        <th className="py-4 px-4 font-medium">
                            Planned Date
                        </th>

                        <th className="py-4 px-4 font-medium">
                            Revisions
                        </th>

                        <th className="py-4 px-4 font-medium">
                            Actions
                        </th>

                    </tr>

                </thead>

                <tbody>
                    {
                        topics.map((topic) => (
                            <TopicRow
                                key={topic._id}
                                topic={topic}
                                onDelete={onDelete}
                                onStatusChange={onStatusChange}
                            />
                        ))
                    }
                </tbody>


            </table>
        </div>
    )
}

export default TopicsTable;