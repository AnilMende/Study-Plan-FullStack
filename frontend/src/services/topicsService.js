import api from "../api/axios.js"


export const createTopic = async (topicData) => {

    const response = await api.post("/topics/create", topicData);

    return response.data.data;
}

export const updateTopicStatus = async (id, status) => {

    const response = await api.patch(`/topics/${id}/status`, { status });

    return response.data.data;
}

export const getTopicsByDate = async (date) => {

    const response = await api.get(`/topics?date=${date}`);

    return response.data.data;
}