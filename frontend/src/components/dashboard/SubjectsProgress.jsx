import SubjectProgressCard from "./SubjectProjectCard"


const subjects = [
    {
        name: "Data Structures",
        progress: 70,
        totalTopics: 40,
        color: "bg-green-500"
    },
    {
        name: "Database Management",
        progress: 50,
        totalTopics: 28,
        color: "bg-blue-500"
    },
    {
        name: "Operating Systems",
        progress: 30,
        totalTopics: 20,
        color: "bg-yellow-500"
    },
    {
        name: "Computer Networks",
        progress: 20,
        totalTopics: 15,
        color: "bg-purple-500"
    }
]

const SubjectProgress = () => {
    return (
        <div className="bg-white rounded-2xl border border-gray-200 p-6">

            {/* Header */}
            <div className="flex items-center justify-between mb-6">

                <h3 className="text-lg font-semibold text-gray-900">Subjects Progress</h3>
                <button className="text-blue-600 text-sm font-medium">View all</button>

            </div>

            {/* Subjects */}
            <div className="space-y-6">
                {
                    subjects.map((subject) => (
                        <SubjectProgressCard
                            key={subject.name}
                            {...subject}
                        />
                    ))
                }
            </div>
        </div>
    )
}

export default SubjectProgress;