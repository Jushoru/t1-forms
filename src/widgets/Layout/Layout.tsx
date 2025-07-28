import {Header} from "./Header.tsx";
import {Outlet} from 'react-router-dom'
import {Sidebar} from "./Sidebar";

export const Layout = () => {
    return (
        <div className="flex flex-col h-screen">
            <Header />
            <div className="flex h-full">
                <Sidebar />
                <Outlet />
            </div>
        </div>
    );
};