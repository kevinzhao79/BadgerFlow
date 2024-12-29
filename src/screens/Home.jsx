import { useState, useEffect } from 'react'
import { Container, Row, Col} from 'react-bootstrap'

import 'bootstrap/dist/css/bootstrap.min.css'

import NavBar from '../components/NavBar'

function Home(props) {

    return (
    <Container fluid>
        <Row>
            <NavBar />
        </Row>
        <Row>
        Home
        </Row>
    </Container>
    )
}

export default Home