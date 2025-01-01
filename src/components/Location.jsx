import { Card } from 'react-bootstrap'

import '../styles/location.css'

const Location = (props) => {

    // Placeholder data until parseProps runs
    const data = {
        id : 9999, 
        name : "Name", 
        facility: "Facility", 
        type: "Type of Building", 
        lastUpdated: new Date(), 
        lastCount: 25, 
        capacity: 100
    }

    function parseProps() {

        // data came from gym API
        if (props.hasOwnProperty('LocationId')) {
            data.id = props.LocationId
            data.name = props.LocationName
            data.facility = props.FacilityName
            data.type = 'Gym'
            data.lastUpdated = props.LastUpdatedDateAndTime
            data.lastCount = props.LastCount
            data.capacity = props.TotalCapacity
        }

        // Otherwise, then props came from college library API
        else {
            data.id = props.id
            switch (props.name) {
                case '2191': data.name = 'College Library 2nd Floor'
                break
                case '2250 / Computer Lab': data.name = 'College Library 2nd Floor Computer Lab'
                break
                case '3191': data.name = "College Library 3rd Floor"
                break
                case '3250 / WisCEL': data.name = 'College Library 3rd Floor Computer Lab'
                break
                default: data.name = 'College Library Unknown'
            }
            data.facility = props.facility
            data.type = 'Library'
            data.lastUpdated = new Date()
            data.lastCount = props.people
            data.capacity = props.capacity
        }
    }
    
    /**
     * @param {int} diff the difference between two Date() objects, in Unix time (MS)
     * @returns {string} a string representation of the time difference
     */
    function formatTimeDifference(diff) {
        
        let remainingSeconds = Math.abs(diff / 1000)

        if (! remainingSeconds) {
            return "0 Seconds"
        }

        const day = 24 * 60 * 60
        const hour = 60 * 60
        const minute = 60

        if (remainingSeconds > day) {
            return "Over 1 Day"
        }

        remainingSeconds %= day
        const hours = Math.floor(remainingSeconds / hour)
        remainingSeconds %= hour
        const minutes = Math.floor(remainingSeconds / minute)
        remainingSeconds %= minute
        const seconds = Math.floor(remainingSeconds)
      
        const timeParts = []
        if (hours) timeParts.push(`${hours} Hour${hours > 1 ? 's' : ''}`)
        if (minutes) timeParts.push(`${minutes} Minute${minutes > 1 ? 's' : ''}`)
        if (seconds) timeParts.push(`${seconds} Second${seconds > 1 ? 's' : ''}`)
      
        return timeParts.join(', ')
    }

    parseProps()

    const strDiff = formatTimeDifference(new Date() - new Date(data.lastUpdated))

    return (
    <Card>
        <Card.Title>{data.name}</Card.Title>
        <Card.Body>
            <Card.Text>Facility: {data.facility}{'\n'}Capacity: {data.lastCount} out of {data.capacity}{'\n'}Last Updated: {strDiff} ago</Card.Text>
        </Card.Body>
    </Card>
    )

}

export default Location