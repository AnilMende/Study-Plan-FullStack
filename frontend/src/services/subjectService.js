
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

    //console.log(response.data.data);

    return response.data.data;
}

export const createSubject = async (data) => {

    const response = await api.post("/subjects/create", data);

    return response.data.data;
}

export const deleteSubject = async (id) => {

    const response = await api.delete(`/subjects/delete/${id}`);

    return response.data.data;
}

export const getSubject = async (id) => {

    const response = await api.get(`/subjects/${id}`);

    return response.data.data;
}