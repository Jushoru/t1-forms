import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    Alert,
    Snackbar,
    Tooltip,
    CircularProgress,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { API_URL } from '@/shared/api';

interface User {
    id: string;
    name: string;
    surName: string;
    fullName: string;
    email: string;
}

export const MainPage = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch(`${API_URL}/api/v1/users`, {
                    credentials: 'include'
                });

                if (!response.ok) {
                    throw new Error('Ошибка загрузки пользователей');
                }

                const data = await response.json();
                setUsers(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Неизвестная ошибка');
                setOpenSnackbar(true);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    const handleDelete = async (userId: string, email: string) => {
        if (!window.confirm(`Вы точно уверены, что хотите удалить пользователя ${email}?`)) {
            return;
        }

        try {
            setDeleteLoading(userId);

            const response = await fetch(`${API_URL}/api/v1/users/${userId}`, {
                method: 'DELETE',
                credentials: 'include'
            });

            if (!response.ok) {
                throw new Error('Failed to delete user');
            }

            setUsers(users.filter(user => user.id !== userId));
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to delete user');
            setOpenSnackbar(true);
        } finally {
            setDeleteLoading(null);
        }
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    if (loading) {
        return <div className="fixed inset-0 flex items-center justify-center">
            <img
                src={`${import.meta.env.BASE_URL || ''}/loader.svg`}
                alt="Loading..."
                className="w-[150px]"
            />
        </div>;
    }

    return (
        <div className="flex justify-center m-[2rem]">
            <TableContainer component={Paper} sx={{ maxWidth: 1000 }}>
                <Table aria-label="users table">
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Surname</TableCell>
                            <TableCell>Full Name</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell>{user.id}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.name}</TableCell>
                                <TableCell>{user.surName}</TableCell>
                                <TableCell>{user.fullName}</TableCell>
                                <TableCell>
                                    <IconButton
                                        aria-label="edit"
                                        onClick={() => navigate(`/user/edit/${user.id}`)}
                                        disabled={deleteLoading === user.id}
                                    >
                                        <EditIcon />
                                    </IconButton>

                                    {user.id !== "1" ? (
                                        <IconButton
                                            aria-label="delete"
                                            onClick={() => handleDelete(user.id, user.email)}
                                            disabled={deleteLoading === user.id}
                                        >
                                            {deleteLoading === user.id ? (
                                                <CircularProgress size={24} />
                                            ) : (
                                                <DeleteIcon />
                                            )}
                                        </IconButton>
                                    ) : (
                                        <Tooltip title="Администратора нельзя удалить">
                                            <span>
                                              <IconButton
                                                  aria-label="delete-disabled"
                                                  disabled
                                              >
                                                <DeleteIcon color="disabled" />
                                              </IconButton>
                                            </span>
                                        </Tooltip>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
            >
                <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
                    {error}
                </Alert>
            </Snackbar>
        </div>
    );
};