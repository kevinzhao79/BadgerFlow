import { useEffect } from 'react'
import { Container, Row, Card } from 'react-bootstrap'


import 'bootstrap/dist/css/bootstrap.min.css'
import '../styles/screens.css'

import NavBar from '../components/NavBar'

import { getEMSData } from '../helpers/fetchData'

function Dashboard(props) {

    return (
    <Container fluid>
        <Card>
            <Card.Title>Dashboard</Card.Title>
        </Card>
    </Container>
    )
}

export default Dashboard