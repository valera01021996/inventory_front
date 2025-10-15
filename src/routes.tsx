import MainPage from "pages/MainPage";
import RacksPage from "pages/RacksPage";
import LoginPage from "pages/LoginPage";
import ServersPage from "pages/ServersPage";
import NotFoundPage from "pages/NotFoundPage";
import { AppRoutes } from "route_config";
import type { AppRoute, AppRoutesProps } from "route_config";
import RackDetailPage from "pages/RackDetailPage";

export const routeConfig: Record<AppRoute, AppRoutesProps> = {
    [AppRoutes.MAIN]: {
        path: "/",
        element: <MainPage />,
        layout: "main",
        name: "Главная",
        isNav: true,
        authOnly: true,
    },
    [AppRoutes.RACKS]: {
        path: "/racks",
        element: <RacksPage />,
        layout: "main",
        name: "Главная",
        isNav: true,
        authOnly: true,
    },
    [AppRoutes.RACK_DETAIL]: {
        path: "/racks/:rackId",
        element: <RackDetailPage />,
        layout: "main",
        name: "Главная",
        isNav: true,
        authOnly: true,
    },
    [AppRoutes.SERVERS]: {
        path: "/servers",
        element: <ServersPage />,
        layout: "main",
        name: "Главная",
        isNav: true,
        authOnly: true,
    },

    [AppRoutes.LOGIN]: {
        path: "/login",
        element: <LoginPage />,
        layout: "auth",
        name: "Авторизация",
        isNav: false,
        authOnly: false,
    },
    [AppRoutes.NOT_FOUND]: {
        path: "*",
        element: <NotFoundPage />,
        layout: "main",
        name: "404",
        isNav: false,
        authOnly: false,
    },
};
