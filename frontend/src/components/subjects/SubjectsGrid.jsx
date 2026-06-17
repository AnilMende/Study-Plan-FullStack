import SubjectCard from "./SubjectCard.jsx";

const SubjectsGrid = ({ subjects, onSubjectDeleted }) => {

    if (!subjects.length) {
        return (
            <div className="bg-white rounded-2xl border  border-dashed border-gray-300 p-10 text-center">

                <h3 className="text-lg font-semibold text-gray-700 mb-2">
                    No subjects found
                </h3>

                <p className="text-gray-500 text-sm">
                    Start by creating your first subject.
                </p>

            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6 cursor-pointer">
            {
                subjects.map((subject) => (
                    <SubjectCard
                        key={subject._id}
                        subject={subject}
                        onSubjectDeleted={onSubjectDeleted}
                    />
                ))
            }
        </div>
    )
}

export default SubjectsGrid;