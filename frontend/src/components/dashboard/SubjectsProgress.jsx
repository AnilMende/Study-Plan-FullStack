import { useEffect, useState } from "react"
import SubjectProgressCard from "./SubjectProjectCard.jsx"
import { getAllSubjectsProgress } from "../../services/subjectService.js";

const colors = [
    "bg-blue-500",
    "bg-green-500",
    "bg-purple-500",
    "bg-orange-500",
    "bg-pink-500"
];

const SubjectProgress = () => {

    const [subjects, setSubjects] = useState([]);

    useEffect(() => {

        const fetchSubjects = async () => {

            try {

                const data = await getAllSubjectsProgress();

                setSubjects(data);

            } catch (error) {
                console.log(error);
            }
        }

        fetchSubjects();

    }, []);

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
                    subjects.map((subject, index) => (
                        <SubjectProgressCard
                            key={subject.name}
                            {...subject}
                            color={
                                colors[index % colors.length]
                            }
                        />
                    ))
                }
            </div>
        </div>
    )
}

export default SubjectProgress;