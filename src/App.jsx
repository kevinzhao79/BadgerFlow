/* App.jsx */

import { BrowserRouter, Route, Routes } from 'react-router'

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
        <Routes>
        <Route index element={<Home/>} />
        <Route path='/locations' element={<Locations />} />
        <Route path='/dashboard' element={<Dashboard />} />
        
        <Route path='/login' element={<Login />} />
        <Route path='/logout' element={<Logout />} />
        <Route path="*" element={<PageNotFound />} />
        </Routes>
    </BrowserRouter>
    )
    
}

export default App
