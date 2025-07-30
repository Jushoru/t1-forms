import {API_URL} from "@/shared/api.ts";

export const userDelete = async (userId: string) => {
    try {
        const response = await fetch(`${API_URL}/api/v1/users/${userId}`, {
            method: 'DELETE',
            credentials: 'include'
        });

        if (!response.ok) {
            throw new Error('Ошибка удаления пользователя');
        }

        setUsers(users.filter(user => user.id !== userId));
    } catch (err) {
        setError(err instanceof Error ? err.message : 'Ошибка удаления пользователя');
        setOpenSnackbar(true);
    }
}