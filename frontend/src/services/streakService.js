import api from "../api/axios.js"

export const getStreakData = async (year) => {

    const response = await api.get(`/dashboard/analytics/streak?${year}`);

    return response.data.data;
}