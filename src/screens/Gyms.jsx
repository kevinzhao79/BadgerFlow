/* Gyms.jsx */

import { useState, useEffect } from 'react'
import { Container, Row, Spinner } from 'react-bootstrap'
import { motion } from 'framer-motion';
import { fadeUp } from '../helpers/Animations'

import 'bootstrap/dist/css/bootstrap.min.css'

import Locations from '../components/Locations'
import NavBar from '../components/NavBar'

import { getEMSData, getGymData } from '../helpers/FetchData'

function Gyms(props) {

    const [data, setData] = useState([])
    const [emsData, setEMSData] = useState([])

    useEffect(() => {
        const loadData = async () => {
            const gymData = await getGymData()
            const EMSData = await getEMSData()
            setData(gymData)
            setEMSData(EMSData)
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

export default Gyms