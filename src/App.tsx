import { Suspense, useCallback } from "react";
import { Routes, Route } from "react-router";
import MainLayout from "layout/MainLayout";
import { RequireAuth } from "layout/RequireAuth";
import { PageLoader } from "components/PageLoader";
import type { AppRoutesProps } from "route_config";
import { routeConfig } from "routes";

function App() {
    const renderWithWrapper = useCallback((route: AppRoutesProps) => {
        let element = (
            <Suspense fallback={<PageLoader />}>{route.element}</Suspense>
        );

        if (route.layout == "main") {
            element = <MainLayout>{element}</MainLayout>;
        }

        if (route.authOnly) {
            element = <RequireAuth>{element}</RequireAuth>;
        }

        return <Route key={route.path} path={route.path} element={element} />;
    }, []);

    return <Routes>{Object.values(routeConfig).map(renderWithWrapper)}</Routes>;
}

export default App;
