/* Libraries.jsx */

import { useState, useEffect } from 'react'
import { Container, Row} from 'react-bootstrap'

import 'bootstrap/dist/css/bootstrap.min.css'

import NavBar from '../components/NavBar'
import Locations from '../components/Locations'

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
                {data.length === 0 ? <p> Still loading! </p> : <Locations data={data} />}
            </Row>
        </Container>
        )

}

export default Libraries