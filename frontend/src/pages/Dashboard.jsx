import StatsCard from "../components/Cards/StatsCard.jsx";

import { CheckCircle2, Clock3, Flame, NotebookPen } from "lucide-react";
import SubjectProgress from "../components/dashboard/SubjectsProgress.jsx";
import TodaysPlan from "../components/dashboard/TodaysPlan.jsx";
import RecentActivity from "../components/dashboard/RecentActivity.jsx";

const Dashboard = () => {
    return (
        <div className="space-y-6">

            {/* Stats Grid */}
            <div className="grid grid-cols-4 gap-6">

                <StatsCard
                    title="Total Topics"
                    value="128"
                    subtitle="View all"
                    icon={
                        <NotebookPen
                            className="text-blue-600"
                            size={26}
                        />
                    }
                    iconBg="bg-blue-100"
                />

                <StatsCard
                    title="Completed Today"
                    value="7"
                    subtitle="View all"
                    icon={
                        <CheckCircle2
                            className="text-green-600"
                            size={26}
                        />
                    }
                    iconBg="bg-green-100"
                />

                <StatsCard
                    title="Pending Tasks"
                    value="24"
                    subtitle="View all"
                    icon={
                        <Clock3
                            className="text-yellow-600"
                            size={26}
                        />
                    }
                    iconBg="bg-yellow-100"
                />

                <StatsCard
                    title="Current Streak"
                    value="12"
                    subtitle="days"
                    icon={
                        <Flame
                            className="text-purple-600"
                            size={26}
                        />
                    }
                    iconBg="bg-purple-100"
                />

            </div>

            {/* Middle Grid */}
            <div className="grid grid-cols-2 gap-6">

                {/* Subjects Progress */}
                <SubjectProgress />

                {/* Today's Plan */}
                <TodaysPlan />

            </div>

            <RecentActivity />

        </div>
    )
}

export default Dashboard;