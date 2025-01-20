/* Locations.jsx */

import { useState, useEffect } from 'react'
import { Container, Row, Col, Spinner, Button } from 'react-bootstrap'
import { motion } from 'framer-motion';
import { fadeUp } from '../helpers/Animations'
import DatePicker from "react-datepicker";

import 'bootstrap/dist/css/bootstrap.min.css'
import "react-datepicker/dist/react-datepicker.css";
import "../styles/custom_datepicker.css";

import NavBar from '../components/NavBar'
import LocationContainer from '../components/LocationContainer'

import { getGymData, getClibData, getEMSData } from '../helpers/FetchData'

function Locations(props) {

    const [data, setData] = useState([])
    const [emsData, setEMSData] = useState([])
    const [date, setDate] = useState(new Date())
    const [isOpen, setIsOpen] = useState(false) // checks datepicker open or not status
    const [showScroll, setShowScroll] = useState(false) // tracks scroll position

    useEffect(() => {
        // Listen for scroll events
        const handleScroll = () => {
            if (window.scrollY > window.innerHeight /2) {
                setShowScroll(true)
            } else {
                setShowScroll(false)
            }
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    useEffect(() => {
        setData([]); // Reset data on date change
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
                <>
                    <Row>
                        <Col style={{alignItems : "center", justifyContent : "center"}}>
                            <h5 style={{fontFamily : "var(--primary-font)", fontSize : "var(--heading-size)", color : "var(--text-color)"}}>Select Date for Events:&nbsp;&nbsp;&nbsp;</h5>
                            <DatePicker
                                selected={date}
                                onChange={(newDate) => {
                                    setDate(newDate)
                                    setIsOpen(false) 
                                }}
                                open={isOpen}
                                onFocus={() => setIsOpen(true)}  
                                onClickOutside={() => setIsOpen(false)} 
                            />
                            
                        </Col>
                        <p style={{fontFamily : "var(--secondary-font)", fontSize : "var(--secondary-size)", color : "var(--text-color)"}}> * Note: Changing the date only affects each Location's Event data, not the Location's availability, which always tracks the current time. </p>
                    </Row>
                    <motion.div
                        initial="initial"
                        animate="animate"   
                        variants={fadeUp}
                        >
                            {data.length === 0 ? (
                                <Row className="justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
                                    <Spinner animation="border" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </Spinner>
                                </Row>
                            ) : (
                                <LocationContainer data={data} emsData={emsData} filter='all' />
                            )}
                        
                </motion.div>
                <Button
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className={`scroll-top-button ${showScroll ? "visible" : ""}`}
                >
                    ↑
                </Button>
                </>
        </Container>
    )
}

export default Locations