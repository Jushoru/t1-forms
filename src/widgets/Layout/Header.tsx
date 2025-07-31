import { Logout } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import {API_URL} from "@/shared/api.ts";

export const Header = () => {
    const navigate = useNavigate();
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    const handleLogout = async () => {
        setIsLoggingOut(true);
        try {
            await fetch(`${API_URL}/api/v1/auth/logout`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });
            navigate('/login', { replace: true });
        } catch (error) {
            console.error('Logout failed:', error);
            alert('Не удалось выйти. Попробуйте снова.');
        } finally {
            setIsLoggingOut(false);
        }
    };

    return (
        <header className="flex w-screen min-w-full bg-secondary py-vertical">
            <div className="flex justify-between items-center mx-horizontal w-full">
                <div className="flex items-center">
                    <img src="/logo.svg" alt="logo" width="35" />
                    <span className="text-gh font-bold text-primary uppercase ml-3.5">
                        Формовочный цех
                    </span>
                </div>

                <IconButton
                    color="inherit"
                    onClick={handleLogout}
                    disabled={isLoggingOut}
                    aria-label="Выйти из аккаунта"
                    sx={{
                        color: '#f0e8d5',
                    }}
                >
                    <Logout />
                </IconButton>
            </div>
        </header>
    );
};