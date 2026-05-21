import { useEffect, useState } from "react"
import { getAllSubjects } from "../../services/subjectService.js";
import { createTopic } from "../../services/topicsService.js";
import toast from "react-hot-toast";

const AddTopicModal = ({ onClose, onTopicCreated }) => {

    const [subjects, setSubjects] = useState([]);

    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        subjectId: "",
        title: "",
        priority: "medium",
        plannedDate: "",
        estimatedMinutes: ""
    });


    // Fetch Subjects
    useEffect(() => {

        const fetchSubjects = async () => {

            try {

                const data = await getAllSubjects();

                setSubjects(data);

            } catch (error) {
                console.log(error);
            }
        };

        fetchSubjects();

    }, [])

    // Handle input change
    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };

    // Submit Topic 
    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            setLoading(true);

            await createTopic(formData);
            toast.success("Topic created successfully");

            onTopicCreated();
            
            onClose();

        } catch (error) {

            console.log(error);
            toast.error("Topic creation failed");

        } finally {

            setLoading(false);

        }
    }

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

            {/* Modal */}
            <div className="bg-white w-full max-w-lg rounded-3xl p-8 shadow-xl">

                {/* Header */}
                <div className="flex items-center justify-between mb-6">

                    <h2 className="text-2xl font-bold">Add Topic</h2>

                    <button onClick={onClose} className="text-gray-500 hover:text-black text-xl cursor-pointer">
                        ✕
                    </button>
                </div>

                {/* form */}
                <form onSubmit={handleSubmit} className="space-y-5">

                    {/* Subject */}
                    <div>
                        <label className="block mb-2 text-sm font-medium">Subject</label>

                        <select
                            name="subjectId"
                            value={formData.subjectId}
                            onChange={handleChange}
                            className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none"
                            required
                        >

                            <option value="">Select Subject</option>
                            {
                                subjects.map((subject) => (
                                    <option key={subject._id} value={subject._id}>
                                        {subject.name}
                                    </option>
                                ))
                            }
                        </select>

                    </div>

                    {/* Title */}
                    <div>

                        <label className="block mb-2 text-sm font-medium">Topic Title</label>

                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="Enter topic title"
                            className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none"
                            required
                        />
                    </div>

                    {/* Priority */}
                    <div>

                        <label>Priority</label>

                        <select
                            name="priority"
                            value={formData.priority}
                            onChange={handleChange}
                            className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none"
                        >

                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>

                        </select>
                    </div>

                    {/* Planned Date */}
                    <div>
                        <label className="block mb-2 text-sm font-medium">Planned Date</label>

                        <input
                            type="date"
                            name="plannedDate"
                            value={formData.plannedDate}
                            onChange={handleChange}
                            className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none"
                        />
                    </div>

                    {/* Estimated Minutes */}
                    <div>

                        <label>Estimated Minutes</label>

                        <input
                            type="number"
                            name="estimatedMinutes"
                            value={formData.estimatedMinutes}
                            onChange={handleChange}
                            placeholder="45"
                            className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none"
                        />

                    </div>

                    {/* buttons */}
                    <div>

                        <button
                            type="button"
                            onClick={onClose}
                            className="px-5 py-3 mr-8 rounded-xl border border-gray-200 cursor-pointer">
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl cursor-pointer"
                        >
                            {
                                loading ? "Creating..." : "Create Topic"
                            }

                        </button>
                    </div>
                </form>

            </div>
        </div>
    )
}

export default AddTopicModal;