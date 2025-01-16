/* All.jsx */

import { useState, useEffect } from 'react'
import { Container, Row, Col, Spinner } from 'react-bootstrap'
import { motion } from 'framer-motion';
import { fadeUp } from '../helpers/Animations'
import DatePicker from "react-datepicker";

import 'bootstrap/dist/css/bootstrap.min.css'
import "react-datepicker/dist/react-datepicker.css";
import "../styles/custom_datepicker.css";

import NavBar from '../components/NavBar'
import Locations from '../components/Locations'

import { getGymData, getClibData, getEMSData } from '../helpers/FetchData'

function All(props) {

    const [data, setData] = useState([])
    const [emsData, setEMSData] = useState([])
    const [date, setDate] = useState(new Date())

    useEffect(() => {
        const loadData = async () => {
            const clibData = await getClibData()
            const gymData = await getGymData()
            const EMSData = await getEMSData(date)
            setData([...gymData, ...clibData])
            setEMSData(EMSData)
        }
        loadData()
    }, [date])

    useEffect(() => {
        // console.log(date)
    }, [date])

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
                <>
                    <Row>
                        <Col style={{alignItems : "center", justifyContent : "center"}}>
                            <h5 style={{fontFamily : "var(--primary-font)", fontSize : "var(--heading-size)", color : "var(--text-color)"}}>Select Date for Events:&nbsp;&nbsp;&nbsp;</h5>
                            <DatePicker selected={date} onChange={(date) => setDate(date)} />
                        </Col>
                        <p style={{fontFamily : "var(--secondary-font)", fontSize : "var(--secondary-size)", color : "var(--text-color)"}}> * Note: Changing the date only affects each Location's Event data, not the Location's availability, which always tracks the current time. </p>
                    </Row>
                    <motion.div
                        initial="initial"
                        animate="animate"
                        variants={fadeUp}
                    >
                        <Locations data={data} emsData={emsData} filter='all' />
                    </motion.div>
                </>
            )}
        </Container>
    )
}

export default All