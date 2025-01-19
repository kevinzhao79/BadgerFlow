import { useRef } from 'react'
import { Container, Row, Col, Card, Button, Form} from 'react-bootstrap'
import axios from 'axios'

import 'bootstrap/dist/css/bootstrap.min.css'
import '../styles/screens.css'

import NavBar from '../components/NavBar'

function Login(props) {

    const registerUsername = useRef('')
    const registerPassword = useRef('')
    const registerConfirmPassword = useRef('')
    const loginUsername = useRef('')
    const loginPassword = useRef('')

    const register = async () => {

        const username = registerUsername.current.value
        const password = registerPassword.current.value
        const confirmPassword = registerConfirmPassword.current.value

        // console.log(`Attempting to register user ${username} with password ${password} and confirmed password ${confirmPassword}.`)

        if (username.length < 1 || username.length > 64) {
            alert('Error: Username must be between 1 and 64 characters.')
            return
        }
        else if (password.length < 1 || password.length > 64) {
            alert('Error: Password must be between 1 and 64 characters.')
            return
        }
        else if (password !== confirmPassword) {
            alert('Error: Passwords must match.')
            return
        }

        const body = {
            username : username, 
            password : password
        }
        
        try {
            const resp = await axios.post('http://localhost:3000/register', body)
            alert(resp.data.msg)
        }
        catch (error) {
            console.log('error:', error)
        }

        registerUsername.current.value = ''
        registerPassword.current.value = ''
        registerConfirmPassword.current.value = ''
        
        // console.log(`Register user ${username} returned with response: ${message}`)

    }

    const login = async () => {

        const username = loginUsername.current.value
        const password = loginPassword.current.value

        // console.log(`Attempting to login user ${user} with password ${pass}.`)

        if (username.length < 1 || username.length > 64) {
            alert('Error: Username must be between 1 and 64 characters.')
            return
        }
        else if (password.length < 1 || password.length > 64) {
            alert('Error: Password must be between 1 and 64 characters.')
            return
        }

        const body = {
            username : username, 
            password : password
        }

        let resp = ''

        try {
            resp = await axios.post('http://localhost:3000/login', body)
        }
        catch (error) {
            resp = error
        }

        alert(resp.data.msg)

        loginUsername.current.value = ''
        loginPassword.current.value = ''

        // console.log(`Login user ${username} returned with response: ${resp}`)

    }

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
                                    <Form.Control type='text' placeholder='Username' ref={registerUsername} />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row}>
                                <Form.Label column sm={3}> Password </Form.Label>
                                <Col sm={6}>
                                    <Form.Control type='password' placeholder='Password' ref={registerPassword} />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row}>
                                <Form.Label column sm={3}> Confirm Password </Form.Label>
                                <Col sm={6}>
                                    <Form.Control type='password' placeholder='Confirm Password' ref={registerConfirmPassword} />
                                </Col>
                            </Form.Group>
                        </Form>
                        <Button name='Submit' variant='primary' onClick={register} > Submit </Button>
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
                                    <Form.Control type='text' placeholder='Username' ref={loginUsername} />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row}>
                                <Form.Label column sm={3}> Password </Form.Label>
                                <Col sm={6}>
                                    <Form.Control type='password' placeholder='Password' ref={loginPassword} />
                                </Col>
                            </Form.Group>
                        </Form>
                        <Button name='Submit' variant='primary' onClick={(loginUsername, loginPassword) => login(loginUsername, loginPassword)}> Submit </Button>
                    </Card.Body>
                </Col>
            </Row>
        </Card>
    </Container>
        )
}

export default Login