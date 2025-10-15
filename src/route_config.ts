import type { RouteProps } from "react-router";

export const AppRoutes = {
    MAIN: "main",
    RACKS: "racks",
    RACK_DETAIL: "rack_detail",
    SERVERS: "servers",

    LOGIN: "login",
    NOT_FOUND: "not_found",
} as const;

export type AppRoute = (typeof AppRoutes)[keyof typeof AppRoutes];

export type AppRoutesProps = RouteProps & {
    authOnly?: boolean;
    layout?: string;
    isNav: boolean;
    name?: string;
};