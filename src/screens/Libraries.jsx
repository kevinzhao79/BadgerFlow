/* Libraries.jsx */

import { useState, useEffect } from 'react'
import { Container, Row} from 'react-bootstrap'

import 'bootstrap/dist/css/bootstrap.min.css'

import NavBar from '../components/NavBar'
import Locations from '../components/Locations'

import { getClibData, getEMSData } from '../helpers/FetchData'

function Libraries(props) {

    const [data, setData] = useState([])
    const [emsData, setEMSData] = useState([])

    useEffect(() => {
        const loadData = async () => {
            const clibData = await getClibData()
            const EMSData = await getEMSData()
            setData(clibData)
            setEMSData(EMSData)
        }
        loadData()
    }, [])

    return (
        <Container fluid>
            <Row>
                <NavBar />
            </Row>
            {data.length === 0 ? <p> Still loading! </p> : <Locations data={data} emsData={emsData}/>}
        </Container>
        )

}

export default Libraries