import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js";

import Topic from "../models/topicModel.js";

import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat.js";
import validateDate from "../utils/validateDate.js";
// Safe Date validation
dayjs.extend(customParseFormat);


// Monthly Calendar API
// this api returns summarized data per day

export const getMonthlyCalendar = asyncHandler(async (req, res) => {

    const userId = req.user._id;

    const month = Number(req.query.month);
    const year = Number(req.query.year);

    if (!month || !year) {
        throw new ApiError(400, "Month and year are required");
    }

    if(month < 1 || month > 12){
        throw new ApiError(400, "Month must me between 1 and 12");
    }

    if(year < 2000 || year > 2100){
        throw new ApiError(400, "Invalid year");
    }

    // Month start
    const startDate = new Date(year, month - 1, 1);

    // Month end
    const endDate = new Date(year, month, 0, 23, 59, 59, 999);

    const calendarData = await Topic.aggregate([

        {
            $match: {
                userId: req.user._id,
                plannedDate: {
                    $gte: startDate,
                    $lte: endDate
                },
                isDeleted: false
            }
        },

        {
            $group: {
                _id: {
                    date: {
                        $dateToString: {
                            format: "%Y-%m-%d",
                            date: "$plannedDate"
                        }
                    },
                    status: "$status"
                },
                count: { $sum: 1 }
            }
        }
    ]);

    // Format response
    const formattedData = {};

    calendarData.forEach((item) => {

        const date = item._id.date;
        const status = item._id.status;

        if (!formattedData[date]) {
            formattedData[date] = {
                date,
                completed: 0,
                pending: 0,
                revision: 0
            };
        }

        formattedData[date][status] = item.count;
    });


    return res.status(200).json(
        new ApiResponse(
            200,
            Object.values(formattedData),
            "Calendar data fetched successfully"
        )
    );

})

// Get Topics By specific day

export const getTopicsByDay = asyncHandler(async (req, res) => {

    const userId = req.user._id;

    const { date } = req.query;

    if (!date) {
        throw new ApiError(400, "Date is required");
    }

    // Validate Format
    if(!validateDate(date)){
        throw new ApiError(
            400,
            "Invalid date format. Use YYYY-MM-DD"
        );
    }

    const startDate = new Date(date);
    startDate.setHours(0, 0, 0, 0);

    const endDate = new Date(date);
    endDate.setHours(23, 59, 59, 999);

    const topics = await Topic.find({

        userId,

        plannedDate: {
            $gte: startDate,
            $lte: endDate
        },

        isDeleted: false
    })
        .populate("subjectId", "name")
        .sort({ plannedDate: 1 });

    return res.status(200).json(
        new ApiResponse(
            200,
            topics,
            "Topics fetched successfully"
        )
    );
})