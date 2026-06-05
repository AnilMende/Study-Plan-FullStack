import { useState, useEffect } from "react";
import StreakHeader from "../components/streak/StreakHeader.jsx";
import { getStreakData } from "../services/streakService.js";
import StreakStats from "../components/streak/StreakStats.jsx";


const StreakPage = () => {


    const [streakData, setStreakData] = useState(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const fetchData = async () => {

            try {

                const data = await getStreakData();

                setStreakData(data);
            } catch (error) {
                console.log(error);

            } finally {
                setLoading(false);

            }
        };

        fetchData();

    }, []);


    if (loading) {

        return (
            <div>
                Loading Streak Data...
            </div>
        )
    };


    return (
        <div className="space-y-6">

            <StreakHeader />

            <StreakStats
                streakData={streakData}
            />
        </div>
    )
}

export default StreakPage;