import Topic from "../models/topicModel.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";

export const getNotifications = asyncHandler(async (req, res) => {

    const userId = req.user._id;

    const today= new Date();

    today.setHours(0,0,0,0);

    // overdue topics
    const overdueTopics = await Topic.find({

        userId,
        isDeleted : false,
        status : {
            $ne : "completed"
        },

        plannedDate : {
            $lt : today
        }
    }).select("title");


    // pending today
    const tomorrow = new Date(today);

    tomorrow.setDate(tomorrow.getDate() + 1);

    const pendingToday = await Topic.find({

        userId,
        isDeleted : false,
        status : "pending",

        plannedDate : {
            $gte : today,
            $lt : tomorrow
        }
    }).select("title");

    // Revision topics
    const revisions = await Topic.find({

        userId,
        isDeleted : false,
        status : "revision",

    }).select("title");

    const notifications = [

        ...overdueTopics.map(topic => ({

            type : "overdue",

            message : `"${topic.title}" is overdue`
        })),

        ...pendingToday.map(topic => ({

            type : "today",

            message : `"${topic.title}" is pending today`
        })),

        ...revisions.map(topic => ({

            type : "revision",

            message : `"Revision pending for "${topic.title}`
        }))
    ];

    return res.status(200).json(
        new ApiResponse(
            200,
            notifications,
            "Notifications fetched"
        )
    );

})