import { useEffect, useState } from 'react'
import { Container, Row, Col, Card} from 'react-bootstrap'

import 'bootstrap/dist/css/bootstrap.min.css'
import '../styles/screens.css'

import NavBar from '../components/NavBar'
import EMSCard from '../components/EMSCard'

import { getEMSData, getGymData } from '../helpers/fetchData'

function Dev(props) {

    const [data, setData] = useState([])

    useEffect(() => {
        const loadData = async () => {
            const EMSData = await getEMSData()
            setData(EMSData)
        }
        loadData()
    }, [])

    return (
    <Container fluid>
        <Row>
            <NavBar />
        </Row>
        <Card>
            <Card.Title>Testing Data</Card.Title>
        </Card>
        <Row>
            {data.length === 0 ? 'Still Loading...' : data.map(reservation => (
            <Col sm={12} md={6} lg={4} key={reservation.Id}>
                <EMSCard {...reservation}/>
            </Col>
            ))}
        </Row>
    </Container>
    )
}

export default Dev