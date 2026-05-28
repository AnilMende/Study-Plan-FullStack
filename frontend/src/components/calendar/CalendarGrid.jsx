import dayjs from "dayjs";
import {
    ChevronLeft,
    ChevronRight
} from "lucide-react";

const CalendarGrid = ({
    month,
    year,
    calendarData,
    selectedDate,
    setSelectedDate,
    setCurrentMonth,
    setCurrentYear
}) => {

    // Month Name
    const monthName = dayjs(
        `${year}-${month}-01`
    ).format("MMMM YYYY");

    // First day of month
    const firstDay = dayjs(
        `${year}-${month}-01`
    );

    // Total days in month
    const daysInMonth = firstDay.daysInMonth();

    // Start weekday
    const startDay = firstDay.day();

    // date lookup map
    const dateMap = {};

    calendarData.forEach((item) => {
        dateMap[item.date] = item;
    });

    // Previous month
    const goToPrevMonth = () => {

        if (month === 1) {

            setCurrentMonth(12);
            setCurrentYear(prev => prev - 1);

        } else {

            setCurrentMonth(prev => prev - 1);
        }
    };

    // Next month
    const goToNextMonth = () => {

        if (month === 12) {

            setCurrentMonth(1);
            setCurrentYear(prev => prev + 1);

        } else {

            setCurrentMonth(prev => prev + 1);
        }
    };

    // Today button
    const goToToday = () => {

        const today = dayjs();

        setCurrentMonth(today.month() + 1);
        setCurrentYear(today.year());

        setSelectedDate(
            today.format("YYYY-MM-DD")
        );
    };

    // Calendar cells
    const cells = [];

    // Empty cells before month starts
    for (let i = 0; i < startDay; i++) {

        cells.push(
            <div
                key={`empty-${i}`}
                className="h-24"
            />
        );
    }

    // Actual days
    for (let day = 1; day <= daysInMonth; day++) {

        const formattedDate = dayjs(
            `${year}-${month}-${day}`
        ).format("YYYY-MM-DD");

        const data = dateMap[formattedDate];

        const isSelected =
            selectedDate === formattedDate;

        const isToday =
            dayjs().format("YYYY-MM-DD") === formattedDate;

        cells.push(

            <div
                key={day}
                onClick={() => setSelectedDate(formattedDate)}
                className={`
                    h-24 rounded-xl border cursor-pointer
                    transition-all duration-200
                    p-2 flex flex-col items-center justify-start
                    hover:bg-gray-50
                    ${isSelected
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-100 bg-white"
                    }
                `}
            >

                {/* Date */}
                <div
                    className={`
                        w-7 h-7 rounded-full
                        flex items-center justify-center
                        text-sm font-medium
                        ${isToday
                            ? "bg-blue-600 text-white"
                            : "text-gray-700"
                        }
                    `}
                >
                    {day}
                </div>

                {/* Dots */}
                <div className="flex gap-1 mt-3">

                    {data?.completed > 0 && (
                        <div className="w-2 h-2 rounded-full bg-green-500" />
                    )}

                    {data?.revision > 0 && (
                        <div className="w-2 h-2 rounded-full bg-yellow-400" />
                    )}

                    {data?.pending > 0 && (
                        <div className="w-2 h-2 rounded-full bg-gray-400" />
                    )}

                </div>

            </div>
        );
    }

    return (

        <div className="bg-white rounded-2xl p-6 border border-gray-100">

            {/* Header */}
            <div className="flex items-center justify-between mb-6">

                {/* Left */}
                <div className="flex items-center gap-3">

                    <button
                        onClick={goToPrevMonth}
                        className="
                            w-9 h-9 rounded-lg border border-gray-200
                            flex items-center justify-center
                            hover:bg-gray-100
                        "
                    >
                        <ChevronLeft size={18} />
                    </button>

                    <h2 className="text-2xl font-semibold">
                        {monthName}
                    </h2>

                    <button
                        onClick={goToNextMonth}
                        className="
                            w-9 h-9 rounded-lg border border-gray-200
                            flex items-center justify-center
                            hover:bg-gray-100
                        "
                    >
                        <ChevronRight size={18} />
                    </button>

                </div>

                {/* Today Button */}
                <button
                    onClick={goToToday}
                    className="
                        px-4 py-2 rounded-lg
                        border border-gray-200
                        text-sm font-medium
                        hover:bg-gray-100
                    "
                >
                    Today
                </button>

            </div>

            {/* Week Days */}
            <div className="grid grid-cols-7 mb-4">

                {
                    [
                        "Sun",
                        "Mon",
                        "Tue",
                        "Wed",
                        "Thu",
                        "Fri",
                        "Sat"
                    ].map((day) => (

                        <div
                            key={day}
                            className="
                                text-center text-sm font-medium
                                text-gray-500
                            "
                        >
                            {day}
                        </div>
                    ))
                }

            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-3">

                {cells}

            </div>

        </div>
    );
};

export default CalendarGrid;