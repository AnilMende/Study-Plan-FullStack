import { BookOpen, Calendar, Flame, Trophy } from "lucide-react";
import StatsCard from "../components/Cards/StatsCard.jsx";

const StreakStats = ({ streakData }) => {

    return (
        <div className="grid grid-cols-4 gap-6">

            <StatsCard
                title="Current Streak"
                value={streakData.currentStreak}
                subtitle="days"
                icon={
                    <Flame
                        className="text-yellow-600"
                    />
                }
                iconBg="bg-yellow-100"
            />

            <StatsCard
                title="Longest Streak"
                value={streakData.longestStreak}
                subtitle="days"
                icon={
                    <Trophy
                        className="text-purple-600"
                    />
                }
                iconBg="bg-purple-100"
            />

            <StatsCard
                title="Study Days This Month"
                value={streakData.studyDaysThisMonth}
                subtitle="days"
                icon={
                    <Calendar
                        className="text-blue-600"
                    />
                }
                iconBg="bg-blue-100"
            />

            <StatsCard
                title="Total Study Days"
                value={streakData.totalStudyDays}
                subtitle="days"
                icon={
                    <BookOpen
                        className="text-green-600"
                    />
                }
                iconBg="bg-green-100"
            />
        </div>
    )
}

export default StreakStats;