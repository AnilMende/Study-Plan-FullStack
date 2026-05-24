import Subject from "../models/subjectModel.js";
import Topic from "../models/topicModel.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";


export const getRecentActivity = asyncHandler(async (req, res) => {

    const userId = req.user._id;

    // Recent topics
    const recentTopics = await Topic.find({
        userId,
        isDeleted: false
    }).populate("subjectId", "name")
        .sort({ updatedAt: -1 })
        .limit(10);


    // Recent subjects
    const recentSubjects = await Subject.find({

        userId,
        isDeleted: false

    }).sort({ createdAt: -1 })
        .limit(5);

    const topicActivities = recentTopics.map(topic => {

        let type = "created";

        if (topic.status === "completed") {
            type = "completed";
        }
        else if (topic.status === "revision") {
            type = "revision";
        }

        return {

            id: topic._id,
            type,
            title: topic.title,
            subject: topic.subjectId?.name,
            time: topic.updatedAt
        };

    });


    const subjectActivities = recentSubjects.map(subject => ({

        id: subject._id,
        type: "subject",
        title: subject.name,
        time: subject.createdAt

    }));

    // Merge + sort
    const activities = [
        ...topicActivities,
        ...subjectActivities
    ].sort(
        (a, b) =>
            new Date(b.time) - new Date(a.time)
    );


    return res.status(200).json(
        new ApiResponse(
            200,
            activities.slice(0, 10),
            "Recent Activity fetched"
        )
    );

})