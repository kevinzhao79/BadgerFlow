import { useState, useEffect } from 'react'
import { Container, Row, Col} from 'react-bootstrap'

import 'bootstrap/dist/css/bootstrap.min.css'

import NavBar from '../components/NavBar'
import Location from '../components/Location'

import { getClibData } from '../helpers/FetchData'

function Libraries(props) {

    const [data, setData] = useState([])

    useEffect(() => {
        const loadData = async () => {
            const clibData = await getClibData()
            setData(clibData)
        }
        loadData()
    }, [])

    return (
        <Container fluid>
            <Row>
                <NavBar />
            </Row>
            <Row>
                <h3>Libraries</h3>
            </Row>
            <Row>
                {data.length === 0 ? <p>Loading...</p> : data.map(region => (
                <Col sm={12} md={6} lg={4} key={region.id}>
                    <Location {...region} facility={"College Library"} />
                </Col>))
                }
            </Row>
        </Container>
        )

}

export default Libraries