import api from "../api/axios.js"


export const registerUser = async (userData) => {

    const response = await api.post("/auth/register", userData);

    return response.data;
}


export const loginUser = async (userData) => {

    const response = await api.post("/auth/login", userData);

    return response.data;
}

export const logoutUser = async () => {

    const response = await api.post("/auth/logout");

    return response.data;
}

export const getCurrentUser = async () => {

    const response = await api.get("/auth/me");

    return response.data.data;
}

export const changePassword = async (data) => {

    const response = await api.put("/auth/change-password", data);

    return response.data.data;
}

