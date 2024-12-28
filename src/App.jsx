import { useState, useEffect } from 'react'
import { Container, Row, Col, Card} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import Location from './components/Location'
import './App.css'

function App() {

    const [data, setData] = useState([])

    useEffect(() => {
        const getData = async () => {
            const resp = await fetch("https://goboardapi.azurewebsites.net/api/FacilityCount/GetCountsByAccount?AccountAPIKey=7938FC89-A15C-492D-9566-12C961BC1F27", {
            method : "GET"
            })
            const badgerData = await resp.json()
            setData(() => badgerData)
            console.log(badgerData)
        }
        getData()
    }, [])

    return (
    <Container fluid>
        <Row>
        {! data ? <p> Still loading! </p> : 
        data.map(location => (
            <Col sm={12} md={6} lg={4} key={location.LocationId}>
                <Location {...location}/>
            </Col>))}
        </Row>
    </Container>
        
    )
}

export default App
