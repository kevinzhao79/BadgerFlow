
import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';

import '../styles/layout.css';

function Layout() {
    return (
        <>
            <header className="fixed-header">
                <NavBar />
            </header>
            <div className="layout-spacer"></div>
            <Outlet />
        </>
    );
}

export default Layout;