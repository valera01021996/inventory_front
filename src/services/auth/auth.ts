import type { LoginRequest, LoginResponse } from "types/auth";
import { api } from "./baseQuery";

export const authAPI = api.injectEndpoints({
    endpoints: build => ({
        login: build.mutation<LoginResponse, LoginRequest>({
            query: credentials => ({
                url: "/auth/login/",
                method: "POST",
                body: credentials,
            }),
        }),
    }),
});

export const { useLoginMutation } = authAPI;
