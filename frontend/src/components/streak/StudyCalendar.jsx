import { ChevronDown } from "lucide-react";
import YearFilter from "./YearFilter.jsx";

const StudyCalendar = ({ activity = [], selectedYear, availableYears, onYearChange }) => {

    // Activity lookup
    const activityMap = {};

    activity.forEach((day) => {
        activityMap[day.date] = day.count;
    });

    // Build months
    const months = [];

    for (let month = 0; month < 12; month++) {

        const daysInMonth = new Date(
            selectedYear,
            month + 1,
            0
        ).getDate();

        const monthDays = [];

        for (let day = 1; day <= daysInMonth; day++) {

            const dateString =
                `${selectedYear}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

            monthDays.push({
                date: dateString,
                day,
                count: activityMap[dateString] || 0
            });
        }

        months.push({
            monthName: new Date(
                selectedYear,
                month
            ).toLocaleString("default", {
                month: "short"
            }),
            days: monthDays
        });
    }

    // Color Intensity
    const getColor = (count) => {

        if (!count)
            return "bg-gray-300";

        if (count === 1)
            return "bg-green-300";

        if (count === 2)
            return "bg-green-500";

        if (count <= 4)
            return "bg-green-700";

        return "bg-green-800";
    };

    return (

        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">

            {/* Header */}
            <div
                className="flex items-center justify-between mb-6"
            >

                <div>

                    <h3
                        className="text-lg font-semibold text-gray-900"
                    >
                        Study Activity
                    </h3>

                    <p
                        className="text-sm text-gray-500 mt-1"
                    >
                        Activity Heatmap of {selectedYear}
                    </p>

                </div>

                {/* Year Filter */}
                <YearFilter
                    availableYears={availableYears}
                    selectedYear={selectedYear}
                    onYearChange={onYearChange}
                />

            </div>

            {/* Months Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">

                {
                    months.map((month) => (

                        <div
                            key={month.monthName}
                            className="border border-gray-100 rounded-xl p-4 hover:bg-gray-100 cursor-pointer"
                        >

                            {/* Month Header */}
                            <div className="flex items-center justify-between mb-3">

                                <h4 className="font-semibold text-gray-800">
                                    {month.monthName}
                                </h4>

                                <span className="text-xs text-gray-500">
                                    {month.days.length} Days
                                </span>

                            </div>

                            {/* Month Grid */}
                            <div className="grid grid-cols-7 gap-1">

                                {
                                    month.days.map((day) => (

                                        <div
                                            key={day.date}
                                            title={`${day.date} • ${day.count} activities`}
                                            className={`
                                                w-4
                                                h-4
                                                rounded-sm
                                                cursor-pointer
                                                transition-all
                                                hover:scale-125
                                                ${getColor(day.count)}
                                            `}
                                        />

                                    ))
                                }

                            </div>

                        </div>

                    ))
                }

            </div>

            {/* Legend */}
            <div className="flex justify-end items-center gap-2 mt-8 text-xs text-gray-500">

                <span>Less</span>

                <div className="w-3 h-3 rounded-sm bg-gray-200" />

                <div className="w-3 h-3 rounded-sm bg-green-200" />

                <div className="w-3 h-3 rounded-sm bg-green-400" />

                <div className="w-3 h-3 rounded-sm bg-green-600" />

                <div className="w-3 h-3 rounded-sm bg-green-800" />

                <span>More</span>

            </div>

        </div>
    );
};

export default StudyCalendar;