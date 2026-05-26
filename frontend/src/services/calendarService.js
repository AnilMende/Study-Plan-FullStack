import api from "../api/axios.js"

export const getMonthlyCalendar = async (month, year) => {

    const response = await api.get(`/calendar?month=${month}&year=${year}`);

    return response.data.data;
}

export const getTopicsByDay = async (date) => {

    const response = await api.get(`/calendar/day?date=${date}`);

    return response.data.data;
}