import Topic from "../models/topicModel.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";


export const getAnalyticsData = asyncHandler(async (req, res) => {

    const userId = req.user._id;

    const range = Number(req.query.range) || 30;

    const startDate = new Date();
    startDate.setDate(
        startDate.getDate() - range
    );

    // Total counts
    const topics = await Topic.find({
        userId,
        isDeleted: false
    });

    const totalTopics = topics.length;

    const completedTopics = topics.filter((topic) => topic.status === "completed");

    const pendingTopics = topics.filter((topic) => topic.status === "pending");

    const revisionTopics = topics.filter((topic) => topic.status === "revision");

    const completionRate = totalTopics === 0 ? 0 : Math.round((completedTopics.length / totalTopics) * 100);


    // Total Study Minutes
    const totalStudyMinutes = topics.reduce(
        (acc, topic) =>
            acc + (topic.estimatedMinutes || 0), 0
    );

    // Topics completed over time
    const completedTrend = await Topic.aggregate([
        {
            $match: {
                userId,
                status: "completed",
                completedDate: { $gte: startDate },
                isDeleted: false
            }
        },

        {
            $group: {
                _id: {
                    $dateToString: {
                        format: "%Y-%m-%d",
                        date: "$completedDate"
                    }
                },

                completed: {
                    $sum: 1
                }

            }
        },

        {
            $sort: {
                _id: 1
            }
        }
    ]);

    // formatted trend
    const formattedTrend = completedTrend.map((item) => ({

        date: item._id,

        completed: item.completed
    }));

    // Status Distribution
    const statusDistribution = await Topic.aggregate([

        {
            $match: {
                userId,
                isDeleted: false
            }
        },

        {
            $group: {
                _id: "$status",
                count: {
                    $sum: 1
                }
            }
        }
    ]);

    // Subject distribution
    const subjectDistribution = await Topic.aggregate([

        {
            $match: {
                userId: req.user._id,
                isDeleted: false
            }
        },

        {
            $lookup: {
                from: "subjects",
                localField: "subjectId",
                foreignField: "_id",
                as: "subject"
            }
        },

        {
            $unwind: "$subject"
        },

        {
            $group: {
                _id: "$subject.name",
                count: { $sum: 1 }
            }
        }

    ]);

    // Subject Progress
    const subjectProgress =
        await Topic.aggregate([

            {
                $match: {
                    userId,
                    isDeleted: false
                }
            },

            {
                $lookup: {

                    from: "subjects",

                    localField: "subjectId",

                    foreignField: "_id",

                    as: "subject"
                }
            },

            {
                $unwind: "$subject"
            },

            {
                $group: {

                    _id: "$subject.name",

                    total: {
                        $sum: 1
                    },

                    completed: {

                        $sum: {

                            $cond: [
                                {
                                    $eq: [
                                        "$status",
                                        "completed"
                                    ]
                                },

                                1,

                                0
                            ]
                        }
                    }
                }
            }

        ]);

    // Add progress percentage
    const formattedSubjectProgress = subjectProgress.map((subject) => ({

        subject: subject._id,

        total: subject.total,

        completed: subject.completed,

        progress:
            subject.total === 0
                ? 0
                : Math.round(
                    (
                        subject.completed / subject.total
                    ) * 100
                )
    }));

    // Most Studied Subject

    const mostStudiedSubject =
        formattedSubjectProgress.length > 0

            ? formattedSubjectProgress.reduce(
                (max, current) =>
                    current.total > max.total
                        ? current
                        : max

            ).subject

            : "N/A";


    // Productivity Insights
    const insights = {

        mostStudiedSubject,

        averageTopicPerDay:
            range === 0
                ? 0
                : Number(
                    (
                        totalTopics / range
                    ).toFixed(1)
                )

    };

    // Response

    return res.status(200).json(

        new ApiResponse(
            200,
            {
                totalTopics,

                completionRate,

                totalStudyMinutes,

                total: {
                    completed: completedTopics.length,

                    pending: pendingTopics.length,

                    revision: revisionTopics.length
                },

                completedTrend: formattedTrend,

                statusDistribution,

                subjectProgress: formattedSubjectProgress,

                insights
            },

            "Analytics fetched successfully"
        )
    );

});

// Streak Data API

export const getStreakData = asyncHandler(async (req, res) => {

    const userId = req.user._id;

    // get all completed topics
    const topics = await Topic.find({
        userId,
        isDeleted: false,
        $or: [
            { completedDate: { $ne: null } },
            { lastRevisedDate: { $ne: null } }
        ]
    }).select("completedDate lastRevisedDate revisionCount");

    // get unique study dates
    const studyDates = [
        ...new Set(

            topics.flatMap(topic => {

                const dates = [];

                if (topic.completedDate) {

                    dates.push(
                        topic.completedDate
                            .toISOString()
                            .split("T")[0]
                    );
                }

                if (topic.lastRevisedDate) {

                    dates.push(
                        topic.lastRevisedDate
                            .toISOString()
                            .split("T")[0]
                    );
                }

                return dates;
            })
        )
    ].sort();

    // Current Streak
    let currentStreak = 0;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let checkDate = new Date(today);

    // if the checkDate is in studyDate increment the currentStreak
    while (studyDates.includes(
        checkDate.toISOString().split("T")[0]
    )) {
        currentStreak++;

        checkDate.setDate(
            checkDate.getDate() - 1
        );
    }

    // Longest Streak
    let longestStreak = 0;
    let streak = 0;

    for (let i = 0; i < studyDates.length; i++) {

        if (i === 0) {
            streak = 1;
        } else {

            const prev = new Date(studyDates[i - 1]);

            const curr = new Date(studyDates[i]);

            const diffDays = (curr - prev) / (1000 * 60 * 60 * 24);

            if (diffDays === 1) {
                streak++;
            } else {
                streak = 1;
            }
        }

        longestStreak = Math.max(longestStreak, streak);
    }

    // Study Days this month
    const startOfMonth = new Date(
        today.getFullYear(),
        today.getMonth(),
        1
    );

    const studyDaysThisMonth = studyDates.filter(date =>
        new Date(date) >= startOfMonth
    ).length;

    // Last 7 Days
    const last7Days = [];

    for (let i = 6; i >= 0; i--) {

        const date = new Date(today);

        date.setDate(
            today.getDate() - i
        );

        const dateString = date.toISOString().split("T")[0];

        last7Days.push({
            date: dateString,
            studied:
                studyDates.includes(dateString)
        });
    }

    // total revisions
    const totalRevisions = topics.reduce(
        (sum, topic) =>
            sum + topic.revisionCount,
        0
    );

    // for daily data aggregation
    const activityMap = {};

    topics.forEach(topic => {

        if (topic.completedDate) {
            const date = topic.completedDate
                .toISOString()
                .split("T")[0];

            activityMap[date] =
                (activityMap[date] || 0) + 1;
        }

        if (topic.lastRevisedDate) {
            const date = topic.lastRevisedDate
                .toISOString()
                .split("T")[0];

            activityMap[date] =
                (activityMap[0] || 0) + 1;
        }
    })

    // Study activity
    const studyActivity = Object.entries(activityMap)
        .map(([date, count]) => ({
            date,
            count
        }))
        .sort((a, b) =>
            new Date(a.date) -
            new Date(b.date)
        )

    return res.status(200).json(

        new ApiResponse(
            200,
            {
                currentStreak,
                longestStreak,
                studyDaysThisMonth,
                totalStudyDays: studyDates.length,
                totalRevisions,
                last7Days,
                studyActivity
            },
            "Streak data fetched successfully"
        )
    );
});