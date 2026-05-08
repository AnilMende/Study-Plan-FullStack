import Topic from "../models/topicModel.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";


export const getAnalyticsData = asyncHandler(async (req, res) => {

    const userId = req.user._id;

    const range = Number(req.query.range) || 30;

    const startDate = new Date();
    startDate.setDate(startDate.getDate() - range);

    // Topics completed over time
    const completedTrend = await Topic.aggregate([
        {
            $match: {
                userId: req.user._id,
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
                count: { $sum: 1 }
            }
        },

        {
            $sort: { _id: 1 }
        }
    ]);

    // Status Distribution
    const statusDistribution = await Topic.aggregate([

        {
            $match: {
                userId: req.user._id,
                isDeleted: false
            }
        },

        {
            $group: {
                _id: "$status",
                count: { $sum: 1 }
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

    // Total counts
    const totalCompleted = await Topic.countDocuments({
        userId,
        status: "completed",
        isDeleted: false
    });

    const totalPending = await Topic.countDocuments({
        userId,
        status: "pending",
        isDeleted: false
    });

    const totalRevision = await Topic.countDocuments({
        userId,
        status: "revision",
        isDeleted: false
    });


    return res.status(200).json(

        new ApiResponse(
            200,
            {
                completedTrend,
                statusDistribution,
                subjectDistribution,
                total: {
                    completed: totalCompleted,
                    pending: totalPending,
                    revision: totalRevision
                }
            },
            "Analytics fetched successfully"
        )
    );

});