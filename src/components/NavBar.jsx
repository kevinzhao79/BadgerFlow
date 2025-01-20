import { Container, Button, Col, Row } from "react-bootstrap"
import { useNavigate } from 'react-router'

import '../styles/theme.css'
import '../styles/navbar.css'

function NavBar(props) {
    const loggedIn = localStorage.getItem('loggedIn')
    const navigate = useNavigate()

    function setHome() {
        navigate('/')
    }
    function setLocations() {
        navigate('/locations')
    }
    function setDashboard() {
        navigate('/dashboard')
    }
    function setLogin() {
        navigate('/login')
    }
    function setLogout() {
        navigate('/logout')
    }

    return (
        <Container fluid className="custom-navbar">
            <Row className="w-100 justify-content-between align-items-center">
                <Col>
                    <Button onClick={setHome}> Home </Button>
                    <Button onClick={setLocations}> Locations </Button>
                    <Button onClick={setDashboard}> Dashboard </Button>
                </Col>
                <Col>
                    <h1> BadgerFlow </h1>
                </Col>
                <Col>
                    {loggedIn ? (
                        <Button onClick={setLogout}> Logout </Button>
                    ) : (
                        <Button onClick={setLogin}> Login </Button>
                    )}
                    <Button> Support Me! </Button>
                </Col>
            </Row>
        </Container>
    )
}

export default NavBar
