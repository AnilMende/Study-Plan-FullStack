import api from "../api/axios.js"

export const getStreakData = async () => {

    const response = await api.get("/dashboard/analytics/streak");

    return response.data.data;
}