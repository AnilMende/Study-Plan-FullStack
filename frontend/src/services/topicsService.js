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

export const getTopics = async (params = {}) => {

    const response = await api.get("/topics", { params });

    // console.log(response.data.data);

    return response.data.data;
}

export const deleteTopic = async (id) => {

    const response = await api.delete(`/topics/deleted/${id}`);

    return response.data.data;
}

export const updateTopic = async (id, data) => {

    const response = await api.put(`/topics/update/${id}`, data);

    return response.data.data;
}


export const getRevisionTopics = async () => {

    const response = await api.get("/topics/revision/all");

    return response.data.data;
}

export const reviseTopic = async (id) => {

    const response = await api.patch(`/topics/${id}/revise`);

    return response.data.data;
}