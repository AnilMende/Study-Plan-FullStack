import Subject from "../models/subjectModel.js";
import Topic from "../models/topicModel.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";


export const globalSearch = asyncHandler(async (req, res) => {

    const userId = req.user._id;

    const query = req.query.q;

    if (!query) {

        return res.status(200).json(
            new ApiResponse(
                200,
                [],
                "Search results"
            )
        )
    };

    // search subjects
    const subjects = await Subject.find({

        userId,
        isDeleted: false,
        name: {
            $regex: query,
            $options: "i"
        }
    }).select("name");

    // Search topics
    const topics = await Topic.find({
        userId,
        isDeleted: false,
        title: {
            $regex: query,
            $options: "i"
        }
    }).populate("subjectId", "name")
        .select("title status subjectId")


    const formattedSubjects = subjects.map(subject => ({

        type: "subject",
        id: subject._id,
        name: subject.name

    }));

    const formattedTopics = topics.map(topic => ({

        type: "topic",
        id: topic._id,
        title: topic.title,
        status: topic.status,
        subject: topic.subjectId?.name

    }));


    return res.status(200).json(
        new ApiResponse(
            200,
            {
                subjects: formattedSubjects,
                topics: formattedTopics
            },
            "Search results fetched"
        )
    );

});