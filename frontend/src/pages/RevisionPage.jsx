import { useEffect, useState } from "react";
import { getRevisionTopics, reviseTopic } from "../services/topicsService.js";

import toast from "react-hot-toast";
import RevisionTable from "../components/revision/RevisionTable.jsx";
import RevisionStats from "../components/revision/RevisionStats.jsx";
import RevisionHeader from "../components/revision/RevisionHeader.jsx";
import RevisionFilters from "../components/revision/RevisionFilters.jsx";
import RevisionHistory from "../components/revision/RevisionHistory.jsx";
import RevisionInsights from "../components/revision/RevisionInsights.jsx";

const RevisionPage = () => {

    const [topics, setTopics] = useState([]);

    const [loading, setLoading] = useState(true);

    // for revision filter
    const [activeFilter, setActiveFilter] = useState("all");

    const [searchTerm, setSearchTerm] = useState("");


    useEffect(() => {

        const fetchData = async () => {

            try {

                const data = await getRevisionTopics();

                setTopics(data);

                toast.success("Revision topics fetched");


            } catch (error) {
                // console.log(error);
                toast.error("Failed to fetch topics");

            } finally {
                setLoading(false);
            }
        };

        fetchData();

    }, []);

    // mark the topic as revise based on the id
    const handleMarkRevised = async (topicId) => {

        try {

            await reviseTopic(topicId);

            setTopics((prev) =>
                prev.filter(
                    (topic) =>
                        topic._id !== topicId
                )
            );

            toast.success("Revision Completed");

        } catch (error) {

            toast.error("Failed to update revision");

        }
    }

    // filter logic
    const filteredTopics = topics.filter(
        (topic) => {

            const matchesSearch = topic.title
                .toLowerCase()
                .includes(searchTerm.toLowerCase());

            let matchesRevision = true;

            switch (activeFilter) {

                case "nerver":
                    matchesRevision =
                        topic.revisionCount === 0;
                    break;

                case "1-3":
                    matchesRevision =
                        topic.revisionCount >= 1 &&
                        topic.revisionCount <= 3;
                    break;

                case "4+":
                    matchesRevision =
                        topic.revisionCount >= 4;
                    break;

                default:
                    break;
            }

            return (
                matchesSearch && matchesRevision
            );
        }
    )

    return (
        <div className="space-y-6">

            <RevisionHeader />

            <RevisionStats
                topics={topics}
            />

            <RevisionFilters
                activeFilter={activeFilter}
                setActiveFilter={setActiveFilter}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
            />

            <RevisionTable
                topics={filteredTopics}
                onMarkRevised={handleMarkRevised}
            />

            <div className="grid grid-cols-2 gap-6">

                <RevisionHistory
                    topics={topics}
                />

                <RevisionInsights
                    topics={topics}
                />
            </div>

        </div>
    )
}

export default RevisionPage;