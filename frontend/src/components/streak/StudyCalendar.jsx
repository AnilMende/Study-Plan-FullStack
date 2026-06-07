

const StudyCalendar = ({ activity = [], selectedYear }) => {

    console.log(activity);

    const activityMap = {};

    activity.forEach(day => {
        activityMap[day.date] = day.count;
    });

    const today = new Date();

    const TOTAL_DAYS =
        selectedYear % 4 === 0
            ? 366
            : 365;

    const days = [];

    for (

        let date =
            new Date(
                selectedYear,
                0,
                1
            );

        date.getFullYear() ===
        selectedYear;

        date.setDate(
            date.getDate() + 1
        )

    ) {

        const dateString =
            date.toISOString()
                .split("T")[0];

        days.push({

            date: dateString,

            count:
                activityMap[
                dateString
                ] || 0,

            month:
                date.getMonth(),

            monthName:
                date.toLocaleString(
                    "default",
                    {
                        month: "short"
                    }
                )
        });

    }


    const weeks = [];

    for (let i = 0; i < days.length; i += 7) {
        weeks.push(days.slice(i, i + 7));
    }

    // generating dynamic month labels
    const monthLabels = [];

    weeks.forEach((week, index) => {

        const firstDay = week[0];

        if (!firstDay) return;

        if (index === 0 || firstDay.month !== weeks[index - 1][0]?.month) {
            monthLabels.push({
                month: firstDay.monthName,
                index
            });
        }
    });

    // Heatmap Color logic
    const getColor = (count) => {

        if (!count) {
            return "bg-gray-300";
        }

        if (count === 1) {
            return "bg-green-300"
        }

        if (count === 2) {
            return "bg-green-500"
        }

        if (count <= 4) {
            return "bg-green-700"
        }

        return "bg-green-900";
    }


    return (
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">

            <div className="mb-5">

                <h3 className="text-lg font-semibold text-gray-900">
                    Study Activity
                </h3>

                <p className="text-sm text-gray-500">
                    Last 180 Days
                </p>

            </div>

            {/* Heatmap */}
            <div className="overflow-x-auto">

                {/* Month Labels */}
                <div className="flex mb-1">

                    <div className="w-10" />

                    <div className="relative flex">

                        {
                            monthLabels.map((label) => (

                                <span
                                    key={`${label.month}-${label.index}`}
                                    className="
                                        absolute
                                        text-xs
                                        text-gray-400
                                    "
                                    style={{
                                        left: `${label.index * 16}px`
                                    }}
                                >
                                    {label.month}
                                </span>

                            ))
                        }

                    </div>


                </div>

                {/* Grid */}
                <div className="flex">

                    {/* Day Labels */}
                    <div className="flex flex-col text-xs text-gray-400 mr-3 mt-3">

                        <div className="h-3"></div>

                        <div className="h-4 mt-1">
                            Mon
                        </div>

                        <div className="h-4 mt-5">
                            Wed
                        </div>

                        <div className="h-4 mt-5">
                            Fri
                        </div>

                    </div>

                    {/* Week Columns */}
                    <div className="flex gap-1 mt-5">
                        {
                            weeks.map((week, weekIndex) => {

                                const currentMonth =
                                    week[0]?.month;

                                const previousMonth =
                                    weeks[weekIndex - 1]?.[0]?.month;

                                const isNewMonth =
                                    weekIndex > 0 &&
                                    currentMonth !== previousMonth;

                                return (

                                    <div
                                        key={weekIndex}
                                        className={`
                                            flex
                                            flex-col
                                            gap-1
                                            ${isNewMonth ? "ml-3" : ""}
                                        `}
                                    >

                                        {
                                            week.map((day) => (

                                                <div
                                                    key={day.date}
                                                    title={`${day.count} activities on ${day.date}`}
                                                    className={`
                                                        w-3
                                                        h-3
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

                                );
                            })
                        }

                    </div>
                </div>
            </div>

            {/* Legend */}
            <div
                className="flex justify-end items-center gap-2 mt-6 text-xs text-gray-500"
            >

                <span>Less</span>

                <div className="w-3 h-3 rounded-sm bg-gray-100" />

                <div className="w-3 h-3 rounded-sm bg-green-200" />

                <div className="w-3 h-3 rounded-sm bg-green-400" />

                <div className="w-3 h-3 rounded-sm bg-green-600" />

                <div className="w-3 h-3 rounded-sm bg-green-800" />

                <span>More</span>

            </div>


        </div>
    )
}

export default StudyCalendar;