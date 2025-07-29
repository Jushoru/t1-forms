import {TextField, Button} from "@mui/material";
import {useState} from "react";
import {API_URL} from "@/shared/api.ts";
import {useNavigate} from "react-router-dom";

export const LoginPage = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch(`${API_URL}/api/v1/auth/login`, {
                method: "POST",
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email.trim(),
                    password: password
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Не удалось войти');
            }

            navigate("/");
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Ошибка');
            console.error('Ошибка входа:', err);
        }
    }

    return (
        <div className="flex justify-center items-start mt-[11%]">
            <form className="flex flex-col justify-items-center w-[450px] bg-1 rounded-tw px-[3rem] pb-[2rem] pt-[1.5rem]" onSubmit={handleSubmit}>
                <h2 className="text-2xl font-bold text-center text-[#6471A1] mb-[6px]">Вход в систему</h2>
                {error && (
                    <div className="text-4 text-sm text-center mb-[4px]">
                        {error}
                    </div>
                )}
                <TextField
                    fullWidth
                    label={
                        <span>
                        Email
                        <span style={{ color: '#f85f73'}}>*</span>
                    </span>
                    }
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    margin="dense"
                    size="small"
                    sx={{marginTop: '12px'}}
                />
                <TextField
                    fullWidth
                    type="password"
                    label={
                        <span>
                        Пароль
                        <span style={{ color: '#f85f73'}}>*</span>
                    </span>
                    }
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    margin="dense"
                    size="small"
                />
                <Button sx={{backgroundColor: '#6471A1', marginTop: '16px'}}
                        type="submit" variant="contained" size="small"
                >
                    Войти
                </Button>
            </form>
        </div>
    );
};