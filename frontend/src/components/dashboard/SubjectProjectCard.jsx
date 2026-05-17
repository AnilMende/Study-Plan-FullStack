
const SubjectProgressCard = ({ name, progress, totalTopics, color }) => {
    return (
        <div className="space-y-3">

            {/* Header */}
            <div className="flex items-center justify-between">

                <h4 className="font-medium text-gray-800">{name}</h4>

                <span className="text-sm font-semibold text-gray-500">{progress}%</span>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-2 rounded-full bg-gray-100 overflow-hidden">

                <div
                    className={`h-full rounded-full ${color}`}
                    style={{ width: `${progress}%` }}
                />
            </div>

            {/* Footer */}
            <p className="text-sm text-gray-400">
                {totalTopics} topics
            </p>
            
        </div>
    )
}

export default SubjectProgressCard;