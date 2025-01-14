import { useRef } from 'react'
import { Container, Row, Col, Card, Button, Form} from 'react-bootstrap'

import 'bootstrap/dist/css/bootstrap.min.css'
import '../styles/screens.css'

import NavBar from '../components/NavBar'
import EMSCard from '../components/EMSCard'

import { getEMSData, getGymData } from '../helpers/fetchData'

function Login(props) {

    const registerUsername = useRef('')
    const registerPassword = useRef('')
    const registerConfirmPassword = useRef('')
    const loginUsername = useRef('')
    const loginPassword = useRef('')

    return (
    <Container fluid>
        <Row>
            <NavBar />
        </Row>
        <Card>
            <Row style={{display : 'flex', width : '100%'}}>
                <Col xs={12} sm={6}>
                    <Card.Title> Register </Card.Title>
                    <Card.Body  style={{padding : "0 0 0 0"}}>
                        <Card.Text> to save your pinned Locations to your dashboard!</Card.Text>
                        <Form style={{width : '100%'}}>
                            <Form.Group as={Row}>
                                <Form.Label column sm={3}> Username </Form.Label>
                                <Col sm={6}>
                                    <Form.Control type='text' placeholder='Username' />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row}>
                                <Form.Label column sm={3}> Password </Form.Label>
                                <Col sm={6}>
                                    <Form.Control type='password' placeholder='Password' />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row}>
                                <Form.Label column sm={3}> Confirm Password </Form.Label>
                                <Col sm={6}>
                                    <Form.Control type='password' placeholder='Confirm Password' />
                                </Col>
                            </Form.Group>
                        </Form>
                        <Button name='Submit' variant='primary'> Submit </Button>
                    </Card.Body>
                </Col>

                <Col xs={12} sm={6}>
                    <Card.Title> Login </Card.Title>
                    <Card.Body style={{padding : "0 0 0 0"}}>
                        <Card.Text> if you've already registered! </Card.Text>
                        <Form style={{width : '100%'}}>
                            <Form.Group as={Row}>
                                <Form.Label column sm={3}> Username </Form.Label>
                                <Col sm={6}>
                                    <Form.Control type='text' placeholder='Username' />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row}>
                                <Form.Label column sm={3}> Password </Form.Label>
                                <Col sm={6}>
                                    <Form.Control type='password' placeholder='Password' />
                                </Col>
                            </Form.Group>
                        </Form>
                        <Button name='Submit' variant='primary'> Submit </Button>
                    </Card.Body>
                </Col>
            </Row>
        </Card>
    </Container>
        )
}

export default Login