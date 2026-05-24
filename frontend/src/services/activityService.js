import api from "../api/axios.js"

export const getRecentActivity = async () => {

    const response = await api.get("/activity/recent");

    return response.data.data;
}