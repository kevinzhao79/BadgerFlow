
import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';

import '../styles/layout.css';

function Layout() {
    return (
        <>
            <header className="fixed-header">
                <NavBar />
            </header>
            <div className="layout-spacer">
                <Outlet className="outlet-style" />
            </div>
            
        </>
    );
}

export default Layout;