import StatsCard from "../Cards/StatsCard.jsx";
import { BookOpen, TrendingUp, Clock3, CheckCircle2 } from "lucide-react";

const AnalyticsStats = ({ analytics }) => {

    return (
        <div className="grid grid-cols-4 gap-6">

            <StatsCard
                title="Total Topics"
                value={analytics.totalTopics}
                icon={<BookOpen />}
                iconBg="bg-blue-100"
            />

            <StatsCard
                title="Completion Rate"
                value={`${analytics.completionRate}%`}
                icon={<TrendingUp />}
                iconBg="bg-green-100"
            />

            <StatsCard
                title="Study Hours"
                value={
                    (
                        analytics.totalStudyMinutes / 60
                    ).toFixed(1)
                }
                icon={<Clock3 />}
                iconBg="bg-yellow-100"
            />

            <StatsCard
                title="Completed"
                value={analytics.total.completed}
                icon={<CheckCircle2 />}
                iconBg="bg-purple-100"
            />
        </div>
    )
}

export default AnalyticsStats;