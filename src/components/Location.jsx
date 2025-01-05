/* Location.jsx */

import { Card } from 'react-bootstrap'

import '../styles/location.css'

import { formatTimeDifference } from '../helpers/formatTime'

const Location = (props) => {

    const timeDiff = formatTimeDifference(new Date() - new Date(props.lastUpdated))

    let idCounter = 0

    return (
    <Card>
        <Card.Title>{props.name}</Card.Title>
        <Card.Body>
            <Card.Text>
                Facility: {props.facility}<br />
                Capacity: {props.count} / {props.capacity}<br />
                Last Updated: {timeDiff} ago <br />
            </Card.Text>
            {props.events.length === 0 ? <></> : <Card.Text> Upcoming Events: </Card.Text>}
            {props.events.length === 0 ? <Card.Text>No upcoming events</Card.Text> : props.events.map(event => (
            <Card.Text key={idCounter++}>
                {event.name} <br />
                {event.start} to {event.end}
            </Card.Text>))}
            
        </Card.Body>
    </Card>
    )

}

export default Location