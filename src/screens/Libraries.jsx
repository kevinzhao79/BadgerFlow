import { useState, useEffect } from 'react'
import { Container, Row, Col} from 'react-bootstrap'

import 'bootstrap/dist/css/bootstrap.min.css'

import NavBar from '../components/NavBar'
import Location from '../components/Location'

function Libraries(props) {

    const [data, setData] = useState([])

    useEffect(() => {
        const getData = async () => {
            const resp = await fetch('https://waitz.io/live/uwmadison', {
                method : "GET"
            })
            let libData = await resp.json()
            const regions = libData.data[0].subLocs
            console.log(regions)
            setData(regions)
        }
        getData()
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