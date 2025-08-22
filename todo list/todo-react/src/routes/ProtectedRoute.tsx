import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../hooks/storeHooks';

export default function ProtectedRoute() {
    const user = useAppSelector((s) => s.auth.user);
    if (!user) return <Navigate to="/login" replace />;
    return <Outlet />;
}


