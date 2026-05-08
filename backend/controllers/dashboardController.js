import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import Subject from "../models/subjectModel.js";
import Topic from "../models/topicModel.js";


export const getDashboardData = asyncHandler(async (req, res) => {

    const userId = req.user._id;

    // total counts
    //countDocuments => gives the count of the documents that match the condition
    const totalTopics = await Topic.countDocuments({
        userId,
        isDeleted: false
    });

    const pendingTasks = await Topic.countDocuments({
        userId,
        status: "pending",
        isDeleted: false
    });


    // Completed Today
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    const todayEnd = new Date();
    todayEnd.setHours(23, 59, 59, 999);

    const completedToday = await Topic.countDocuments({

        userId,
        status: "completed",
        completedDate: {
            $gte: todayStart,
            $lte: todayEnd
        },
        isDeleted: false
    });


    // Today's plan

    const todaysPlan = await Topic.find({
        userId,
        plannedDate: {
            $gte: todayStart,
            $lte: todayEnd
        },
        isDeleted: false
    })
        .select("title status plannedDate")
        .sort({ plannedDate: 1 });

    // Recent Activity

    const recentActivity = await Topic.find({
        userId,
        status: { $in: ["completed", "revision"] },
        isDeleted: false
    })
        .sort({ updatedAt: -1 })
        .limit(5)
        .select("title status updatedAt")

    // Subject progress
    const subjects = await Subject.find({
        userId,
        isDeleted: false
    });

    const subjectProgress = await Promise.all(

        subjects.map(async (subject) => {

            const total = await Topic.countDocuments({
                subjectId: subject._id,
                isDeleted: false
            });

            const completed = await Topic.countDocuments({
                subjectId: subject._id,
                status: "completed",
                isDeleted: false
            });

            return {
                subjectId: subject._id,
                subjectName: subject.name,
                totalTopics: total,
                completedTopics: completed,
                progress:
                    total === 0 ? 0 : Math.round((completed / total) * 100)
            };

        })
    );

    // Response 
    return res.status(200).json(
        new ApiResponse(
            200,
            {
                totalTopics,
                completedToday,
                pendingTasks,
                currentStreak: 12,
                todaysPlan,
                recentActivity,
                subjectProgress
            },
            "Dashboard data fetched successfully"
        )
    );
})