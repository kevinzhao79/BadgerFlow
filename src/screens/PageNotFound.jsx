import { Container, Row} from 'react-bootstrap'

import 'bootstrap/dist/css/bootstrap.min.css'

import NavBar from '../components/NavBar'

function PageNotFound() {

    return (
        <Container fluid>
            <Row>
                <NavBar />
            </Row>
            <Row>
                <h3>Error 404 - Page Not Found.</h3>
            </Row>
        </Container>
        )

}

export default PageNotFound