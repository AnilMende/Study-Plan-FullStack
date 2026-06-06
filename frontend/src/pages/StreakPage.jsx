import { useState, useEffect } from "react";
import StreakHeader from "../components/streak/StreakHeader.jsx";
import { getStreakData } from "../services/streakService.js";
import StreakStats from "../components/streak/StreakStats.jsx";
import WeeklyStreakTracker from "../components/streak/WeeklyStreakTracker.jsx";
import StudyCalendar from "../components/streak/StudyCalendar.jsx";


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

            <WeeklyStreakTracker
                days={streakData.last7Days}
            />

            <StudyCalendar
                activity={streakData.studyActivity}
            />
        </div>
    )
}

export default StreakPage;