import StatsCard from "../components/Cards/StatsCard.jsx";

import { RotateCcw, BookCheck, CalendarClock, Trophy } from "lucide-react";

const RevisionStats = ({ topics }) => {

    const totalRevisionTopics = topics.length;

    const totalRevisions = topics.reduce(
        (sum, topic) =>
            sum + topic.revisionCount,
        0
    );

    const oneWeekAgo = new Date();

    oneWeekAgo.setDate(
        oneWeekAgo.getDate() - 7
    );

    const revisedThisWeek =
        topics.filter((topic) => {

            if (!topic.lastRevisedDate) return false;

            return (
                new Date(
                    topic.lastRevisedDate
                ) >= oneWeekAgo
            );

        }).length;


    const mostRevisedTopic =
        topics.length > 0
            ? topics.reduce(
                (max, topic) =>
                    topic.revisionCount > max.revisionCount
                        ? topic
                        : max
            )
            : null;

    return (
        <div className="grid grid-cols-4 gap-6">

            <StatsCard
                title="Need Revision"
                value={totalRevisionTopics}
                icon={
                    <RotateCcw
                        className="text-blue-600"
                    />
                }
                iconBg="bg-blue-100"
            />

            <StatsCard
                title="Total Revisions"
                value={totalRevisions}
                icon={
                    <BookCheck
                        className="text-green-600"
                    />
                }
                iconBg="bg-green-100"
            />

            <StatsCard
                title="Revised this week"
                value={revisedThisWeek}
                icon={
                    <CalendarClock
                        className="text-yellow-600"
                    />
                }
                iconBg="bg-yellow-100"
            />

            <StatsCard
                title="Most Revised"
                value={
                    mostRevisedTopic
                        ? `${mostRevisedTopic.revisionCount}x`
                        : 0
                }
                subtitle={
                    mostRevisedTopic?.title
                }
                icon={
                    <Trophy
                        className="text-purple-600"
                    />
                }
                iconBg="bg-purple-100"
            />
        </div>
    )
}

export default RevisionStats;