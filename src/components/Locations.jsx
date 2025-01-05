/* Locations.jsx */

import { Row, Col } from "react-bootstrap"

import Location from "./Location"

import '../styles/locations.css'

import normalizeData from "../helpers/normalizeData"

/**
 * Creates a list of Location objects based on the normalized data
 * @param {List[Object]} data the normalized data
 * @param {string} name the name of the region/location
 * @param {string} facility the name of the facility that contains the region/location
 * @param {string} lastUpdated when this data was logged, in ISO 8601 format
 * @param {int} count how many people are at the region/location
 * @param {int} capacity how many people max can fit in the region/location
 * @returns {Component} a component containing all of the Location components from each region
 */
 const Locations = (props) => {

    const normalized = JSON.parse(normalizeData(props.data, props.emsData))
    return <Row className='location-container'>
        {normalized.map(location => (
            <Col sm={12} md={6} lg={4} key={location.id}>
                <Location {...location}/>
            </Col>)
        )}
    </Row>

}

export default Locations