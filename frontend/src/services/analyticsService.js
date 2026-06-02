import api from "../api/axios.js"

export const getAnalyticsData = async (range = 30) => {

    const response = await api.get(`/dashboard/analytics?range=${range}`);

    return response.data.data;
}