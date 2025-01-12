/* Location.jsx */

import { Card, ProgressBar, Button } from 'react-bootstrap'
import {motion , AnimatePresence} from 'framer-motion'
import '../styles/location.css'

import { formatTimeDifference } from '../helpers/formatTime'

import {useState } from 'react'

const Location = (props) => {

    const timeDiff = formatTimeDifference(new Date() - new Date(props.lastUpdated))

    const [isExpanded, setIsExpanded] = useState(false)

    let idCounter = 0

    const isOutdated = timeDiff === "Over 1 Day"
    const capacityPercentage = (props.count / props.capacity) * 100

    let progressVariant;
    if (capacityPercentage < 50) {
        progressVariant = 'success';
    } else if (capacityPercentage < 75) {
        progressVariant = 'warning';
    } else {
        progressVariant = 'danger';
    }

    const maxVisibleEvents = 2; // ADJUST AS NEEDED!!!!
    const hasMoreEvents = props.events.length > maxVisibleEvents;

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex-fill"
        >
            <Card className={`location-min-height h-100 ${isOutdated ? 'grey-out' : ''}`}>
                <Card.Title>{props.name}</Card.Title>
                <Card.Body className="card-body">
                    <Card.Text>
                        Facility: {props.facility}<br />
                        <div className="progress-container" style={{ position: 'relative', height: '30px', marginTop: '5px' }}>
                            <ProgressBar
                                now={capacityPercentage}
                                variant={progressVariant}
                                style={{ height: '100%', borderRadius: '5px' }}
                                aria-label={`Capacity: ${props.count} out of ${props.capacity}`}
                            />
                            <div className="progress-label">
                                {props.count} / {props.capacity}
                            </div>
                        </div>
                        Last Updated: {timeDiff} ago <br />
                    </Card.Text>
                    {props.events.length === 0 ?
                        (<Card.Text>
                            No upcoming events
                        </Card.Text>
                        ) : (
                            <>
                                <Card.Text> Upcoming Events: </Card.Text>
                                <AnimatePresence initial={false}>
                                    {props.events.slice(0, isExpanded ? props.events.length : maxVisibleEvents).map((event) => (
                                        <motion.div
                                            key={`${event.name}-${event.room}-${event.start}-${event.end}`}
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            exit={{ opacity: 0, height: 0 }}
                                            transition={{ duration: 0.35 }}
                                        >
                                            <Card.Text>
                                                <strong>{event.name}</strong> - {event.room}
                                                <br />
                                                {event.start} to {event.end}
                                            </Card.Text>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                                
                                {hasMoreEvents && (
                                    <Button variant="link" onClick={toggleExpand} className="expand-button">
                                        {isExpanded ? 'Show Less' : 'Show More'}
                                    </Button>
                                )}
                            </>
                        )
                    }

                </Card.Body>
            </Card>
        </motion.div>
    )

}

export default Location