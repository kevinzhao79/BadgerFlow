/* App.jsx */

import { BrowserRouter, Route, Routes } from 'react-router'

import './app.css'

import Home from './screens/Home'
import AllLocations from './screens/AllLocations'
import Gyms from './screens/Gyms'
import Libraries from './screens/Libraries'
import PageNotFound from './screens/PageNotFound'
import Other from './screens/Other'
import Dev from './screens/Dev'

function App() {

    return (
    <BrowserRouter>
        <Routes>
        <Route index element={<Home/>} />
        <Route path='/all' element={<AllLocations />} />
        <Route path='/gyms' element={<Gyms/>} />
        <Route path='/libraries' element={<Libraries />} />
        <Route path='/other' element={<Other />} />
        
        <Route path='/dev' element={<Dev />} />
        <Route path="*" element={<PageNotFound />} />
        </Routes>
    </BrowserRouter>
    )
    
}

export default App
