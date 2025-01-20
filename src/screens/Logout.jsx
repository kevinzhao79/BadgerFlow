import { useEffect } from 'react'
import { Container, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router'

import 'bootstrap/dist/css/bootstrap.min.css'
import '../styles/screens.css'

import NavBar from '../components/NavBar'

function Logout(props) {

    const navigate = useNavigate()

    useEffect(() => {
        localStorage.setItem('loggedIn', false)
        localStorage.setItem('account', '')
    }, [])

    function goHome() {
        navigate('/')
    }

    return (
    <Container fluid>
        <Row>
            <p> You have successfully logged out.</p>
        </Row>
        <Row>
            <Button onClick={goHome}> Back to Home </Button>
        </Row>
    </Container>
    )
}

export default Logout