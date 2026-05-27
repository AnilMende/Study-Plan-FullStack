
import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { getSubject } from "../services/subjectService.js";
import { deleteTopic, getTopics, updateTopicStatus } from "../services/topicsService.js";
import TopicsTable from "../components/topics/TopicsTable.jsx";

const SubjectDetailsPage = () => {

    // Curly braces around subjectId extracts the string
    // otherwise it will extract entire object which will result in the error
    const { subjectId } = useParams();

    const [subject, setSubject] = useState(null);

    const [topics, setTopics] = useState([]);

    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");

    const [statusFilter, setStatusFilter] = useState("all");

    // Fetch subjects + data
    useEffect(() => {

        const fetchData = async () => {

            try {

                const [subjectData, topicData] = await Promise.all([
                    getSubject(subjectId),
                    getTopics({ subjectId })
                ]);

                setSubject(subjectData);

                setTopics(topicData);

            } catch (error) {

                console.log(error);

            } finally {

                setLoading(false);

            }
        };

        fetchData();

    }, [subjectId]);

    // Filtered topics
    const filteredTopics = useMemo(() => {

        return topics.filter((topic) => {

            const matchesSearch = topic.title.toLowerCase().includes(search.toLowerCase());

            const matchesStatus = statusFilter === "all" || topic.status === statusFilter;

            return matchesSearch && matchesStatus;

        });

    }, [topics, search, statusFilter]);

    // Delete topic
    const handleDelete = async (id) => {

        try {

            await deleteTopic(id);

            setTopics((prev) =>
                prev.filter((topic) =>
                    topic._id !== id
                )
            );

        } catch (error) {
            console.log(error);
        }
    };

    // Update status
    const handleStatusChange = async (id, status) => {

        try {

            await updateTopicStatus(id, status);

            setTopics((prev) =>
                prev.map((topic) =>
                    topic._id === id ? { ...topic, status } : topic
                )
            );

        } catch (error) {
            console.log(error);
        }
    };

    // Progress Calculation
    const completedTopics = topics.filter((topic) => topic.status === "completed").length;

    const progress = topics.length
        ? Math.round(
            (completedTopics / topics.length) * 100
        ) : 0;

    return (
        <div className="space-y-6">

            {/* Header */}
            <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm">

                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

                    {/* Left */}
                    <div>

                        <h1 className="text-3xl font-bold text-gray-900">
                            {subject?.name || "Subject"}
                        </h1>

                        <p className="text-gray-500 mt-2">
                            Manage topics and track study progress.
                        </p>

                    </div>

                    {/* Right */}
                    <div className="min-w-[240px]">

                        <div className="flex items-center justify-between mb-2">

                            <span className="text-sm text-gray-500">
                                Progress
                            </span>

                            <span className="text-sm font-medium text-gray-700">
                                {progress}%
                            </span>

                        </div>

                        <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">

                            <div
                                className="h-full bg-blue-600 rounded-full transition-all duration-500"
                                style={{
                                    width: `${progress}%`
                                }}
                            />

                        </div>

                    </div>

                </div>

            </div>

            {/* Filters */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5 
              flex flex-col md:flex-row gap-4 md:items-center md:justify-between">

                {/* Search */}
                <input
                    type="text"
                    placeholder="Search topics..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full md:w-[300px] px-4 py-3 rounded-xl border border-gray-200 outline-none
                    focus:ring-2 focus:ring-blue-500"
                />

                {/* Status Filter */}
                <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="
                    px-4 py-3
                    rounded-xl
                    border border-gray-200
                    outline-none
                    focus:ring-2
                    focus:ring-blue-500
                    "
                >
                    <option value="all">
                        All Status
                    </option>

                    <option value="pending">
                        Pending
                    </option>

                    <option value="completed">
                        Completed
                    </option>

                    <option value="revision">
                        Revision
                    </option>

                </select>

            </div>

            {/* Content */}
            {
                loading ? (

                    <div className="text-gray-500">
                        Loading topics...
                    </div>
                ) : filteredTopics.length ? (

                    <TopicsTable
                        topics={filteredTopics}
                        onDeleted={handleDelete}
                        onStatusChange={handleStatusChange}
                    />
                ) : (

                    <div className="bg-white rounded-2xl border border-dashed 
                    border-gray-300 p-12 text-center">

                        <h3 className="text-xl font-semibold text-gray-700 mb-2">
                            No topics found
                        </h3>

                        <p className="text-gray-500">
                            Start adding topics to this subject
                        </p>
                    </div>
                )
            }

        </div>
    );
};

export default SubjectDetailsPage;