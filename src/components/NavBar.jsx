/* NavBar.jsx */

import { Container, Button, Col, Row } from "react-bootstrap"
import { useNavigate } from 'react-router'

import '../styles/theme.css'
import '../styles/navbar.css'

function NavBar(props) {

    const navigate = useNavigate()

    function setHome() {
        navigate('/')
    }

    function setAllLocations() {
        navigate('/all')
    }

    function setGyms() {
        navigate('/gyms')
    }

    function setLibraries() {
        navigate('/libraries')
    }

    function setDev() {
        navigate('/dev')
    }

    function setOther() {
        navigate('/other')
    }

    return (
    <Container fluid>
        <Row>
            <Col>
                <Button onClick={setHome}> Home </Button>
                <Button onClick={setAllLocations}> All </Button>
                <Button onClick={setGyms}> Gyms </Button>
                <Button onClick={setLibraries}> Libraries </Button>
                <Button onClick={setOther}> Other </Button>
            </Col>
            <Col>
                <h1> BadgerFlow </h1>
            </Col>
            <Col>
                <Button onClick={setDev}> Dev </Button>
                <Button> Support Me! </Button>
            </Col>
        </Row>
    </Container>
    )

}

export default NavBar