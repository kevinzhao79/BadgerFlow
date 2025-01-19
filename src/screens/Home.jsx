import { useEffect } from 'react'
import { Container, Row, Card } from 'react-bootstrap'


import 'bootstrap/dist/css/bootstrap.min.css'
import '../styles/screens.css'

import NavBar from '../components/NavBar'

import { getEMSData } from '../helpers/fetchData'

function Home(props) {

    return (
    <Container fluid>
        <Row>
            <NavBar />
        </Row>
        <Card>
            <Card.Title>Welcome to BadgerFlow!</Card.Title>
            <Card.Body>
                <Card.Text>
                    Here you can check on the availability of the gyms and libraries at UW-Madison, 
                    see what activities are currently happening at each location, and get estimates for 
                    when each facility is busiest.
                </Card.Text>
                <Card.Text>
                    Below you can find your currently pinned locations for easier access.
                </Card.Text>
            </Card.Body>
        </Card>
    </Container>
    )
}

export default Home