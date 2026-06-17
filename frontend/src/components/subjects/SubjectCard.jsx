import { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { ArrowRight, Trash2 } from "lucide-react";
import { deleteSubject } from "../../services/subjectService.js";
import SubjectProgressBar from "./SubjectProgressBar.jsx";
import DeleteSubjectModel from "./DeleteSubjectModel.jsx";

const SubjectCard = ({ subject, onSubjectDeleted }) => {

    const {
        _id,
        name,
        totalTopics = 0,
        progress = 0,
        color = "#3B82F6",
    } = subject;

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [loading, setLoading] = useState(false);


    // deleting the subject
    const handleDeleteSubject = async () => {

        try {

            setLoading(true);

            await deleteSubject(_id);

            onSubjectDeleted(_id);

            toast.success("Subject deleted");

        } catch (error) {

            toast.error(
                error?.response?.data?.message ||
                "Failed to delete subject"
            );

        } finally {

            setLoading(false);
            setShowDeleteModal(false);
        }
    };

    return (
        <>
            <div className="relative bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-md 
            hover:-translate-y-1 transition-all duration-300">

                {/* Delete Button */}
                <button
                    onClick={() => setShowDeleteModal(true)}
                    className="absolute top-4 right-4 p-2 rounded-lg text-red-500 hover:bg-red-200 
                    transition cursor-pointer">
                    <Trash2 size={18} />
                </button>

                {/* Icon */}
                <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5"
                    style={{
                        backgroundColor: `${color}20`
                    }}
                >
                    <div
                        className="text-2xl"
                        style={{ color }}
                    >
                        {"📘"}
                    </div>

                </div>

                {/* Subject name */}
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                    {name}
                </h2>

                {/* progress */}
                <div className="space-y-2 mb-5">

                    <div className="flex items-center justify-between text-sm">

                        <span className="text-gray-500">
                            Progress
                        </span>

                        <span className="font-medium text-gray-700">
                            {progress}%
                        </span>

                    </div>

                    <SubjectProgressBar
                        progress={progress}
                        color={color}
                    />

                </div>

                {/* Footer */}
                <div className="flex items-center justify-between">

                    <div>
                        <p className="text-xs text-gray-400">
                            Total topics
                        </p>

                        <p className="font-semibold text-gray-800">
                            {totalTopics}
                        </p>
                    </div>

                    <Link to={`/subjects/${_id}`}
                        className="flex items-center gap-1 text-sm font-medium text-blue-600 
                    hover:text-blue-700 transition-colors"
                    >
                        View Topics
                        <ArrowRight size={16} />
                    </Link>

                </div>
            </div>
            {
                showDeleteModal && (
                    <DeleteSubjectModel
                        subjectName={name}
                        loading={loading}
                        onClose={() => setShowDeleteModal(false)}
                        onConfirm={handleDeleteSubject}
                    />
                )
            }
        </>
    )
}

export default SubjectCard;