/* Location.jsx */

import { Card } from 'react-bootstrap'

import '../styles/location.css'

import formatTimeDifference from '../helpers/formatTimeDifference'

const Location = (props) => {

    const timeDiff = formatTimeDifference(new Date() - new Date(props.lastUpdated))

    return (
    <Card>
        <Card.Title>{props.name}</Card.Title>
        <Card.Body>
            <Card.Text>
                Facility: {props.facility}<br />
                Capacity: {props.count} out of {props.capacity}<br />
                Last Updated: {timeDiff} ago
            </Card.Text>
        </Card.Body>
    </Card>
    )

}

export default Location