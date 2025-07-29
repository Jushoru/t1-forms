import { useState, useEffect } from "react";
import { Outlet, Navigate } from 'react-router-dom';
import { API_URL} from "@/shared/api.ts";
import { Header } from "./Header.tsx";
import { Sidebar } from "./Sidebar";

export const Layout = () => {
    const [isAuthChecking, setIsAuthChecking] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await fetch(`${API_URL}/api/v1/auth/me`, {
                    method: 'GET',
                    credentials: 'include'
                });
                if (!response.ok) throw new Error('Не авторизован');
                setIsAuthenticated(true);
            } catch {
                setIsAuthenticated(false);
            } finally {
                setIsAuthChecking(false);
            }
        };
        checkAuth().catch(console.error);
    }, []);

    if (isAuthChecking) {
        return (
            <div className="fixed inset-0 flex items-center justify-center">
                <img
                    src={`${import.meta.env.BASE_URL || ''}/loader.svg`}
                    alt="Loading..."
                    className="w-[150px]"
                />
            </div>
        );
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return (
        <div className="flex flex-col h-full">
            <Header />
            <div className="flex h-full">
                <Sidebar />
                <main className="flex flex-col flex-1">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};