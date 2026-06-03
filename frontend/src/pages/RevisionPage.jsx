import { useEffect, useState } from "react";
import { getRevisionTopics, reviseTopic } from "../services/topicsService.js";

import toast from "react-hot-toast";
import RevisionTable from "../components/revision/RevisionTable.jsx";
import RevisionStats from "../components/revision/RevisionStats.jsx";

const RevisionPage = () => {

    const [topics, setTopics] = useState([]);

    const [loading, setLoading] = useState(true);


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

    return (
        <div className="space-y-6">

            <div>

                <h1 className="text-3xl font-bold text-gray-900">
                    Revision
                </h1>

                <p className="text-gray-500 mt-1">
                    Review topics that need reinforcement
                </p>

            </div>

            <RevisionStats
                topics={topics}
            />

            <RevisionTable
                topics={topics}
                onMarkRevised={handleMarkRevised}
            />

        </div>
    )
}

export default RevisionPage;