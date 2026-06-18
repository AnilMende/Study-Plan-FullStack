import axios from "axios";

const api = axios.create({
    baseURL: "https://study-planner-backend-s86u.onrender.com/api",

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
            !originalRequest.url.includes("/auth/refresh-token")
        ) {

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

                await api.post("/auth/refresh-token");

                processQueue(null);

                return api(originalRequest);

            } catch (err) {

                processQueue(err);

                return Promise.reject(err);

            } finally {

                isRefreshing = false;
            }
        }

        return Promise.reject(error);
    }
);

export default api;
