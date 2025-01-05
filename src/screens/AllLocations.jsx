/* AllLocations.jsx */

import { useState, useEffect } from 'react'
import { Container, Row} from 'react-bootstrap'

import 'bootstrap/dist/css/bootstrap.min.css'

import NavBar from '../components/NavBar'
import Locations from '../components/Locations'

import { getGymData, getClibData, getEMSData } from '../helpers/fetchData'

function AllLocations(props) {

    const [data, setData] = useState([])
    const [emsData, setEMSData] = useState([])

    useEffect(() => {
        const loadData = async () => {
            const gymData = await getGymData()
            const clibData = await getClibData()
            const EMSData = await getEMSData()
            setData([...gymData, ...clibData])
            setEMSData(JSON.parse(EMSData))
        }
        loadData()
    }, [])

    return (
        <Container fluid>
            <Row>
                <NavBar />
            </Row>
            {data.length === 0 ? <p> Still loading! </p> : <Locations data={data} emsData={emsData}/>}
        </Container>
    )
}

export default AllLocations