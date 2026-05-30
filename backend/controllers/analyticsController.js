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

                total : {
                    completed : completedTopics.length,

                    pending : pendingTopics.length,

                    revision : revisionTopics.length
                },

                completedTrend,

                statusDistribution,

                subjectProgress : formattedSubjectProgress,

                insights
            },
            
            "Analytics fetched successfully"
        )
    );

});