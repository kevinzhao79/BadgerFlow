import { BrowserRouter, Route, Routes } from 'react-router';

import './App.css'

import Home from './screens/Home'
import AllLocations from './screens/AllLocations'
import Gyms from './screens/Gyms'
import Libraries from './screens/Libraries'
import PageNotFound from './screens/PageNotFound'

function App() {

    return (
    <BrowserRouter>
        <Routes>
        <Route index element={<Home/>} />
        <Route path='/all' element={<AllLocations />} />
        <Route path="/gyms" element={<Gyms/>} />
        <Route path="/libraries" element={<Libraries />} />
        <Route path="*" element={<PageNotFound />} />
        </Routes>
    </BrowserRouter>
    )
    
}

export default App
