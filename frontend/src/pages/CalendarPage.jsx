import { useEffect, useState } from "react";
import CalendarHeader from "../components/Calendar/CalendarHeader.jsx";
import CalendarGrid from "../components/Calendar/CalendarGrid.jsx";
import DayTopicsPanel from "../components/Calendar/DayTopicsPanel.jsx";

import dayjs from "dayjs";
import { getMonthlyCalendar, getTopicsByDay } from "../services/calendarService.js";

const CalendarPage = () => {

    const today = dayjs();

    const [currentMonth, setCurrentMonth] = useState(today.month() + 1);

    const [currentYear, setCurrentYear] = useState(today.year());

    const [selectedDate, setSelectedDate] = useState(today.format("YYYY-MM-DD"));

    const [calendarData, setCalendarData] = useState([]);

    const [topics, setTopics] = useState([]);

    const [statusFilter, setStatusFilter] = useState("all");


    // Fetch monthly calendar
    useEffect(() => {

        const fetchCalendar = async () => {

            try {
                const data = await getMonthlyCalendar(currentMonth, currentYear);

                setCalendarData(data);

            } catch (error) {
                console.log(error);
            }
        }

        fetchCalendar();

    }, [currentMonth, currentYear]);

    // Fetch selected day topics
    useEffect(() => {

        const fetchTopics = async () => {

            try {

                const data = await getTopicsByDay(selectedDate);

                setTopics(data);

            } catch (error) {
                console.log(error);
            }
        };

        fetchTopics();

    }, [selectedDate]);

    // Filter topics based on the status
    const filteredTopics = statusFilter === "all"
        ? topics
        : topics.filter(topic => topic.status === statusFilter);

    return (
        <div className="space-y-6">

            {/* Header */}
            <CalendarHeader />

            {/* Main layout */}
            <div className="grid grid-cols-[2fr_1fr] gap-6">
                {/* Calendar */}
                <CalendarGrid
                    month={currentMonth}
                    year={currentYear}
                    calendarData={calendarData}
                    selectedDate={selectedDate}
                    setSelectedDate={setSelectedDate}
                    setCurrentMonth={setCurrentMonth}
                    setCurrentYear={setCurrentYear}
                />

                <DayTopicsPanel
                    selectedDate={selectedDate}
                    topics={filteredTopics}
                    statusFilter={statusFilter}
                    setStatusFilter={setStatusFilter}
                />

            </div>

        </div>
    )
}

export default CalendarPage;