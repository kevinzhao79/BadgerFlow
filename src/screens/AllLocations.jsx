/* AllLocations.jsx */

import { useState, useEffect } from 'react'
import { Container, Row, Spinner } from 'react-bootstrap'
import { motion } from 'framer-motion';
import { fadeUp } from '../helpers/Animations'

import 'bootstrap/dist/css/bootstrap.min.css'

import NavBar from '../components/NavBar'
import Locations from '../components/Locations'

import { getGymData, getClibData, getEMSData } from '../helpers/FetchData'

function AllLocations(props) {

    const [data, setData] = useState([])
    const [emsData, setEMSData] = useState([])

    useEffect(() => {
        const loadData = async () => {
            const gymData = await getGymData()
            const clibData = await getClibData()
            const EMSData = await getEMSData()
            setData([...gymData, ...clibData])
            setEMSData(JSON.parse(EMSData))
        }
        loadData()
    }, [])

    return (
        <Container fluid>
            <Row>
                <NavBar />
            </Row>
            {data.length === 0 ? (
                <Row className="justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </Row>
            ) : (
                <motion.div
                    initial="initial"
                    animate="animate"
                    variants={fadeUp}
                >
                    <Locations data={data} emsData={emsData} />
                </motion.div>
            )}
        </Container>
    )
}

export default AllLocations