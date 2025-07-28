import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import {MainPage} from "../pages/main/MainPage.tsx";
import {LoginPage} from "../pages/login/LoginPage.tsx";
import {UserCreatePage} from "../pages/user-create/UserCreatePage.tsx";
import {UserEditPage} from "../pages/user-edit/UserEditPage.tsx";
import {Layout} from "../widgets/Layout/Layout.tsx";


const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                index: true,
                element: <MainPage/>,
            },
            {
                path: 'login',
                element: <LoginPage/>
            },
            {
                path: 'user',
                children: [
                    {
                        path: 'create',
                        element: <UserCreatePage/>
                    },
                    {
                        path: 'edit/:id',
                        element: <UserEditPage/>
                    }
                ]
            }
        ]
    }
], {
    basename: '/t1-forms'
});

function App() {
    return (
        <>
            <div className="flex flex-col flex-auto overflow-auto">
                <RouterProvider router={router}/>
            </div>
        </>
    )
}

export default App
