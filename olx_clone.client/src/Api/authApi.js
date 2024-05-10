import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "/",
    }),
    endpoints: (builder) => ({
        registerUser: builder.mutation({
            query: (userData) => ({
                url: "/",
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: userData,
            }),
        }),
        loginUser: builder.mutation({
            query: (userCredentials) => ({
                url: "/",
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: userCredentials,
            }),
        }),
    }),
});

export const useRegisterUserMutation = authApi.useRegisterUserMutation;
export const useLoginUserMutation = authApi.useLoginUserMutation;

export default authApi;