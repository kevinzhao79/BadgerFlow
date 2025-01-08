import { useEffect, useState } from 'react'
import { Container, Row, Card, Spinner} from 'react-bootstrap'

import 'bootstrap/dist/css/bootstrap.min.css'
import '../styles/screens.css'

import NavBar from '../components/NavBar'

import { getEMSData, getClibData, getGymData } from '../helpers/FetchData'
import Locations from '../components/Locations'

function Other(props) {

    const [data, setData] = useState([])
    const [emsData, setEMSData] = useState([])

    useEffect(() => {
        const loadData = async () => {
            const clibData = await getClibData()
            const gymData = await getGymData()
            const EMSData = await getEMSData()
            setData([...gymData, ...clibData])
            setEMSData(EMSData)
        }
        loadData()
    }, [])

    return (
    <Container fluid>
        <Row>
            <NavBar />
        </Row>
        <Card>
            <Card.Title>Testing Data</Card.Title>
        </Card>
        <Row>
            {
            data.length === 0 ? (
                <Row className="justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </Row>
            ) : <Locations data={data} emsData={emsData} filter='other' />
            }
        </Row>
    </Container>
    )
}

export default Other