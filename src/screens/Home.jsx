import { Container, Row, Card} from 'react-bootstrap'

import 'bootstrap/dist/css/bootstrap.min.css'
import '../styles/screens.css'

import NavBar from '../components/NavBar'

function Home(props) {

    return (
    <Container fluid>
        <Row>
            <NavBar />
        </Row>
        <Card>
            <Card.Title>Welcome to BadgerFlow! </Card.Title>
        </Card>
    </Container>
    )
}

export default Home