
import api from "../api/axios.js";

export const getAllSubjecs = async () => {

    const response = await api.get("/subjects/all");

    return response.data.data;
}

export const getSubjectProgress = async (id) => {

    const response = await api.get(`/subjects/${id}/progress`);

    return response.data.data;
}