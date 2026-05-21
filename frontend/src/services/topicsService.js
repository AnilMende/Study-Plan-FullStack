import api from "../api/axios.js"


export const createTopic = async (topicData) => {

    const response = await api.post("/topics/create", topicData);

    return response.data.data;
}