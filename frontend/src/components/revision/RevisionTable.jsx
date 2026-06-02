import Revisionrow from "./Revisionrow";


const RevisionTable = ({ topics, onMarkRevised }) => {


    if (!topics.length) {

        return (
            <div className="bg-white rounded-2xl p-12 text-center border border-gray-200">

                <h3 className="text-xl font-semibold text-gray-700">
                    🎉 No Topics Need Revision
                </h3>

                <p className="text-gray-500 mt-2">
                    You're caught up with all revisions.
                </p>

            </div>
        );

    }

    return (
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">

            <table className="w-full">

                <thead>

                    <tr className="bg-gray-50 border-b border-gray-200">

                        <th className="px-6 py-4 text-left">
                            Topic
                        </th>

                        <th className="px-6 py-4 text-left">
                            Subject
                        </th>

                        <th className="px-6 py-4 text-left">
                            Revisions
                        </th>

                        <th className="px-6 py-4 text-left">
                            Last Revised
                        </th>

                        <th className="px-6 py-4 text-left">
                            Action
                        </th>

                    </tr>

                </thead>

                <tbody>
                    {
                        topics.map((topic) => (

                            <Revisionrow
                                key={topic._id}
                                topic={topic}
                                onMarkRevised={onMarkRevised}
                            />
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default RevisionTable;