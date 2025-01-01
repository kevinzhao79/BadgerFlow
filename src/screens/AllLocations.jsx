/* AllLocations.jsx */

import { useState, useEffect } from 'react'
import { Container, Row} from 'react-bootstrap'

import 'bootstrap/dist/css/bootstrap.min.css'

import NavBar from '../components/NavBar'
import Locations from '../components/Locations'

import { getGymData, getClibData } from '../helpers/fetchData'

function AllLocations(props) {

    const [data, setData] = useState([])

    useEffect(() => {
        const loadData = async () => {
            const gymData = await getGymData()
            const clibData = await getClibData()
            setData([...gymData, ...clibData])
        }
        loadData()
    }, [])

    return (
    <Container fluid>
        <Row>
            <NavBar />
        </Row>
        <Row className='d-flex align-items-stretch'>
            {data.length === 0 ? <p> Still loading! </p> : <Locations data={data} />}
        </Row>
    </Container>
    )
}

export default AllLocations