/* App.jsx */

import { BrowserRouter, Route, Routes } from 'react-router'

import Layout from './components/Layout'
import ScrollToTop from './helpers/ScrollToTop'

import './app.css'

import Home from './screens/Home'
import Locations from './screens/Locations'
import PageNotFound from './screens/PageNotFound'

import Login from './screens/Login'
import Logout from './screens/Logout'
import Dashboard from './screens/Dashboard'

function App() {

    return (
        <BrowserRouter>
            <ScrollToTop />
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path='locations' element={<Locations />} />
                    <Route path='dashboard' element={<Dashboard />} />

                    <Route path='login' element={<Login />} />
                    <Route path='logout' element={<Logout />} />
                    <Route path="*" element={<PageNotFound />} /></Route> 
                </Routes>
            </BrowserRouter>
    
    )
    
}

export default App
