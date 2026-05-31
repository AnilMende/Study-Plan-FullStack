

const SubjectProgressAnalytics = ({ subjects }) => {

    if (!subjects?.length) {

        return (
            <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">

                <h3 className="text-lg font-semibold text-gray-900">
                    Subject Progress
                </h3>

                <p className="text-gray-500 mt-4">
                    No subject data available.
                </p>

            </div>
        )
    }

    return (
        <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">

            {/* Header */}
            <div className="mb-6">

                <h3 className="text-lg font-semibold text-gray-900">
                    Subject Progress
                </h3>

                <p className="text-sm text-gray-500 mt-1">
                    Completion progress across subjects
                </p>

            </div>

            {/* Subjects */}
            <div className="space-y-5">
                {
                    subjects?.map((subject) => (

                        <div key={subject.subject}>

                            <div className="flex items-center justify-between mb-2">

                                <span className="font-medium text-gray-700">
                                    {subject.subject}
                                </span>

                                <span className="text-sm font-semibold text-gray-600">
                                    {subject.progress}%
                                </span>

                            </div>

                            <div className="h-3 bg-gray-100 rounded-full overflow-hidden">

                                <div className="h-full bg-blue-600 rounded-full transition-all duration-500"
                                    style={{
                                        width: `${subject.progress}%`
                                    }}
                                />

                            </div>

                            <div className="flex justify-between text-xs text-gray-500 mt-2">

                                <span>
                                    {subject.completed} completed
                                </span>

                                <span>
                                    {subject.total} total
                                </span>

                            </div>

                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default SubjectProgressAnalytics;