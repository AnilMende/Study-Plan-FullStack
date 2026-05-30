import api from "../api/axios.js"

export const getAnalyticsData = async () => {

    const response = await api.get("/dashboard/analytics");

    return response.data.data;
}