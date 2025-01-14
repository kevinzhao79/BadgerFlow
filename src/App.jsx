/* App.jsx */

import { BrowserRouter, Route, Routes } from 'react-router'

import './app.css'

import Home from './screens/Home'
import All from './screens/All'
import Gyms from './screens/Gyms'
import Libraries from './screens/Libraries'
import PageNotFound from './screens/PageNotFound'
import Other from './screens/Other'
import Login from './screens/Login'

function App() {

    return (
    <BrowserRouter>
        <Routes>
        <Route index element={<Home/>} />
        <Route path='/all' element={<All />} />
        <Route path='/gyms' element={<Gyms/>} />
        <Route path='/libraries' element={<Libraries />} />
        <Route path='/other' element={<Other />} />
        
        <Route path='/login' element={<Login />} />
        <Route path="*" element={<PageNotFound />} />
        </Routes>
    </BrowserRouter>
    )
    
}

export default App
