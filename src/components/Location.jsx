/* Location.jsx */

import { Card } from 'react-bootstrap'

import '../styles/location.css'

import { formatTimeDifference, formatHHMM } from '../helpers/formatTime'

const Location = (props) => {

    const timeDiff = formatTimeDifference(new Date() - new Date(props.lastUpdated))

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
            <Card.Text>
                {event.name} <br />
                {formatHHMM(event.start)} to {formatHHMM(event.end)}
            </Card.Text>))}
            
        </Card.Body>
    </Card>
    )

}

export default Location