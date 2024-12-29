import { Container, Button, Col, Row } from "react-bootstrap"
import { Navigate, useNavigate } from 'react-router'

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

    return (
    <Container fluid>
        <Row>
            <Col>
                <Button onClick={setHome}> Home </Button>
                <Button onClick={setAllLocations}> All </Button>
                <Button onClick={setGyms}> Gyms </Button>
                <Button onClick={setLibraries}> Libraries </Button>
            </Col>
            <Col>
                <h1> BadgerFlow </h1>
            </Col>
            <Col>
                <Button> Support Me! </Button>
            </Col>
        </Row>
    </Container>
    )

}

export default NavBar