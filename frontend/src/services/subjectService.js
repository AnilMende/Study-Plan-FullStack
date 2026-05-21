
import api from "../api/axios.js";

export const getAllSubjects = async () => {

    const response = await api.get("/subjects/all");

    //console.log(response.data.data);

    return response.data.data;
}

export const getSubjectProgress = async (id) => {

    const response = await api.get(`/subjects/${id}/progress`);

    return response.data.data;
}

export const getAllSubjectsProgress = async () => {

    const response = await api.get("/subjects/progress");

    return response.data.data;
}