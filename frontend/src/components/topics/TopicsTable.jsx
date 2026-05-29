import { useState } from "react";
import TopicRow from "./TopicRow.jsx";


const TopicsTable = ({ topics, onDelete, onStatusChange, onTopicEdit }) => {


    return (
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">

            <div className="overflow-x-auto">

                <table className="w-full">

                    <thead className="bg-gray-50 border-b border-gray-100">

                        <tr className="border-t border-gray-100 hover:bg-gray-50 transition-colors group">

                            <th className="px-6 py-4 text-left text-xs font-semibold tracking-wide text-gray-900 uppercase">
                                Topic
                            </th>

                            <th className="px-6 py-4 text-left text-xs font-semibold tracking-wide text-gray-900 uppercase">
                                Status
                            </th>

                            <th className="px-6 py-4 text-left text-xs font-semibold tracking-wide text-gray-900 uppercase">
                                Planned Date
                            </th>

                            <th className="px-6 py-4 text-left text-xs font-semibold tracking-wide text-gray-900 uppercase">
                                Revisions
                            </th>

                            <th className="px-6 py-4 text-left text-xs font-semibold tracking-wide text-gray-900 uppercase">
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
                                    onTopicEdit={onTopicEdit}
                                />
                            ))
                        }
                    </tbody>


                </table>

            </div>
        </div>
    )
}

export default TopicsTable;