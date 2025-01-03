import { Card } from "react-bootstrap"

const EMSCard = (props) => {

    return (<Card>
        <Card.Title>{props.EventName}</Card.Title>
        <Card.Body>
            <Card.Text>
                Building: {props.Building} <br />
                Room: {props.Room} <br />
                Start time: {new Date(props.EventStart).toString()} <br />
                End time: {new Date(props.EventEnd).toString()} <br />
            </Card.Text>
        </Card.Body>
    </Card>)
}

export default EMSCard