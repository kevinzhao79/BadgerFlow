import { useEffect, useState } from 'react'
import { Container, Row, Col, Card, Spinner} from 'react-bootstrap'

import 'bootstrap/dist/css/bootstrap.min.css'
import '../styles/screens.css'

import NavBar from '../components/NavBar'
import EMSCard from '../components/EMSCard'

import { getEMSData } from '../helpers/FetchData'

function Other(props) {

    const [data, setData] = useState([])

    useEffect(() => {
        const loadData = async () => {
            let EMSData = await getEMSData()
            EMSData = JSON.parse(EMSData)
            setData(EMSData.DailyBookingResults)
            console.log(EMSData.DailyBookingResults)
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
            {
            data.length === 0 ? (
                <Row className="justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </Row>
            ) : (data.map(reservation => (
            <Col sm={12} md={6} lg={4} key={reservation.Id}>
                <EMSCard {...reservation}/>
            </Col>
            )))
                }
        </Row>
    </Container>
    )
}

export default Other