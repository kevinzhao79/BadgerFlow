/* Gyms.jsx */

import { useState, useEffect } from 'react'
import { Container, Row} from 'react-bootstrap'

import 'bootstrap/dist/css/bootstrap.min.css'

import Locations from '../components/Locations'
import NavBar from '../components/NavBar'

import { getEMSData, getGymData } from '../helpers/FetchData'

function Gyms(props) {

    const [data, setData] = useState([])
    const [emsData, setEMSData] = useState([])

    useEffect(() => {
        const loadData = async () => {
            const gymData = await getGymData()
            const EMSData = await getEMSData()
            setData(gymData)
            setEMSData(EMSData)
        }
        loadData()
    }, [])

    return (
    <Container fluid>
        <Row>
            <NavBar />
        </Row>
        {data.length === 0 ? <p> Still loading! </p> : <Locations data={data} emsData={emsData} />}
    </Container>
    )
}

export default Gyms