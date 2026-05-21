import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:5000/api",

    withCredentials: true
});

// Refresh token request state
let isRefreshing = false;

// Queue for failed requests
let failedQueue = [];

// Process queue requests
const processQueue = (error) => {

    failedQueue.forEach((promise) => {

        if (error) {
            promise.reject(error)
        } else {
            promise.resolve();
        }
    });

    failedQueue = [];
}

// Response interceptor
api.interceptors.response.use(

    // Success
    (response) => response,

    // Error
    async (error) => {

        const originalRequest = error.config;

        // if access token expired
        if (error.response?.status === 401 &&
            !originalRequest._retry &&
            !originalRequest.url.includes("/auth/login") &&
            !originalRequest.url.includes("/auth/register") &&
            !originalRequest.url.includes("/auth/refresh-token") &&
            !originalRequest.url.includes("/auth/me")) {

            // prevent infinite retry loop
            originalRequest._retry = true;

            // if refresh already happening
            if (isRefreshing) {

                return new Promise(
                    (resolve, reject) => {

                        failedQueue.push({
                            resolve,
                            reject
                        })
                    }
                ).then(() => {

                    return api(originalRequest);
                });
            }

            isRefreshing = true;

            try {

                // call refresh endpoint
                await api.post("/auth/refresh-token");

                // Retry all queue requests
                processQueue(null);

                // Retry original request
                return api(originalRequest);

            } catch (refreshError) {

                processQueue(refreshError);

                // Logout situation
                window.location.href = "/login";

                return Promise.reject(refreshError);
            } finally {

                isRefreshing = false;

            }
        }

        return Promise.reject(error);
    }
);

export default api;