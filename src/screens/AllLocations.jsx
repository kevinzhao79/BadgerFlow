import { useState, useEffect } from 'react'
import { Container, Row, Col} from 'react-bootstrap'

import 'bootstrap/dist/css/bootstrap.min.css'

import Location from '../components/Location'
import NavBar from '../components/NavBar'

import { getGymData, getClibData } from '../helpers/FetchData'

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
        <Row>
        {! data ? <p> Still loading! </p> : 
        data.map(location => (
            <Col sm={12} md={6} lg={4} key={location.LocationId ? location.LocationId : location.id}>
                <Location {...location}/>
            </Col>))}
        </Row>
    </Container>
    )
}

export default AllLocations