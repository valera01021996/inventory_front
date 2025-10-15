import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router";
import { useAppSelector } from "hooks/useAppSelector";

interface RequireAuthProps {
    children: ReactNode;
}

export function RequireAuth({ children }: RequireAuthProps) {
    const location = useLocation();
    const { isLoggedIn, access_token } = useAppSelector(state => state.auth);

    if (!isLoggedIn || !access_token) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
}