import { useState, useEffect } from "react";
import StreakHeader from "../components/streak/StreakHeader.jsx";
import { getStreakData } from "../services/streakService.js";
import StreakStats from "../components/streak/StreakStats.jsx";
import WeeklyStreakTracker from "../components/streak/WeeklyStreakTracker.jsx";
import StudyCalendar from "../components/streak/StudyCalendar.jsx";
import YearFilter from "../components/streak/YearFilter.jsx";


const StreakPage = () => {


    const [streakData, setStreakData] = useState(null);

    const [loading, setLoading] = useState(true);

    // year wise streak system for heat map
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

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

    }, [selectedYear]);


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

            <YearFilter
                years={streakData.availableYears}
                selectedYear={selectedYear}
                onChange={setSelectedYear}
            />

            <StreakStats
                streakData={streakData}
            />

            <WeeklyStreakTracker
                days={streakData.last7Days}
            />

            <StudyCalendar
                activity={streakData.studyActivity}
                selectedYear={selectedYear}
            />

        </div>
    )
}

export default StreakPage;