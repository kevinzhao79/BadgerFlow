import { useRef, useState } from 'react'
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap'
import axios from 'axios'
import { motion, AnimatePresence } from 'framer-motion'

import 'bootstrap/dist/css/bootstrap.min.css'
import '../styles/screens.css'
import '../styles/login.css'

function Login() {
  const [showRegister, setShowRegister] = useState(false)

  // Refs
  const loginUsername = useRef('')
  const loginPassword = useRef('')
  const registerConfirmPassword = useRef('')

  // Handle form submission
  const handleSubmit = async () => {
    const username = loginUsername.current.value
    const password = loginPassword.current.value

    // Basic validation
    if (username.length < 1 || username.length > 64) {
      alert('Error: Username must be between 1 and 64 characters.')
      return
    }
    if (password.length < 1 || password.length > 64) {
      alert('Error: Password must be between 1 and 64 characters.')
      return
    }

    // If registering, also check confirm password
    if (showRegister) {
      const confirmPassword = registerConfirmPassword.current.value
      if (password !== confirmPassword) {
        alert('Error: Passwords must match.')
        return
      }
    }

    try {
      if (showRegister) {
        // REGISTER
        const resp = await axios.post('http://localhost:3000/register', {
          username,
          password
        })
        alert(resp.data.msg)
      } else {
        // LOGIN
        const resp = await axios.post('http://localhost:3000/login', {
          username,
          password
        })
        alert(resp.data.msg)
      }
    } catch (error) {
      console.error('error:', error)
      alert('An error occurred. Check console for details.')
    }

    // Clear fields
    loginUsername.current.value = ''
    loginPassword.current.value = ''
    if (registerConfirmPassword.current) {
      registerConfirmPassword.current.value = ''
    }
  }

  return (
    <Container fluid className="login-container">
      {/* Fix the card width so it doesn't shrink or grow */}
      <Card
        className="login-card"
        style={{
          width: '400px',       // Fixed width for consistency
          margin: '0 auto',
          padding: '1rem',
          minHeight: '420px',   // Ensure enough height to avoid jumping
          position: 'relative'
        }}
      >
        {/* Title Area with Fade */}
        <AnimatePresence mode="wait">
          {showRegister ? (
            <motion.div
              key="registerTitle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card.Title>Register</Card.Title>
            </motion.div>
          ) : (
            <motion.div
              key="loginTitle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card.Title>Login</Card.Title>
            </motion.div>
          )}
        </AnimatePresence>

        <Card.Body style={{ padding: 0, width: '90%' }}>
          <AnimatePresence mode="wait">
            {showRegister ? (
              <motion.div
                key="registerText"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card.Text style={{ marginBottom: '1rem' }}>
                  Create an account to save pinned locations!
                </Card.Text>
              </motion.div>
            ) : (
              <motion.div
                key="loginText"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card.Text style={{ marginBottom: '1rem' }}>
                  Welcome Back! Sign in to view pinned locations.
                </Card.Text>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Single Form for both Login and Register */}
          <Form style={{ width: '100%' }}>
            <Form.Group as={Row} className="mb-3">
              <Col>
                {/* Consistent placeholders help avoid text-length fluctuations */}
                <Form.Control
                  type="text"
                  placeholder="Enter Username"
                  ref={loginUsername}
                  style={{ width: '100%' }}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
              <Col>
                <Form.Control
                  type="password"
                  placeholder="Enter Password"
                  ref={loginPassword}
                  style={{ width: '100%' }}
                />
              </Col>
            </Form.Group>

            <AnimatePresence initial={false} mode="wait">
              {showRegister && (
                <motion.div
                  key="confirmPasswordRow"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  style={{ overflow: 'hidden' }}
                >
                  <Form.Group as={Row} className="mb-3">
                    <Col>
                      {/* Similar placeholder length helps maintain layout */}
                      <Form.Control
                        type="password"
                        placeholder="Confirm Password"
                        ref={registerConfirmPassword}
                        style={{ width: '100%' }}
                      />
                    </Col>
                  </Form.Group>
                </motion.div>
              )}
            </AnimatePresence>
          </Form>

          {/* Submit Button */}
          <Button
            variant="primary"
            onClick={handleSubmit}
            style={{ marginTop: '0.5rem' }}
            className="submit-button"
          >
            {showRegister ? 'Register' : 'Login'}
          </Button>
        </Card.Body>

        <AnimatePresence mode="wait">
          {showRegister ? (
            <motion.p
              key="toggle-register"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              style={{ marginTop: '1rem' }}
            >
              Already have an account?{' '}
              <span
                onClick={() => setShowRegister(false)}
                style={{ textDecoration: 'underline', cursor: 'pointer' }}
              >
                Sign in here
              </span>
            </motion.p>
          ) : (
            <motion.p
              key="toggle-login"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              style={{ marginTop: '1rem' }}
            >
              Don&apos;t have an account?{' '}
              <span
                onClick={() => setShowRegister(true)}
                style={{ textDecoration: 'underline', cursor: 'pointer' }}
              >
                Register here
              </span>
            </motion.p>
          )}
        </AnimatePresence>
      </Card>
    </Container>
  )
}

export default Login
