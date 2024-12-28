import { Card } from "react-bootstrap"
import moment from 'moment'

const Location = (props) => {

    const lastUpdated = new Date(props.LastUpdatedDateAndTime)
    const now = new Date()
    const diff = now - lastUpdated
    
    /**
     * @param {int} diff the difference between two Date() objects, in Unix time (MS)
     * @returns {string} a string representation of the time difference
     */
    function formatTimeDifference(diff) {
        
        let remainingSeconds = Math.abs(diff / 1000)

        if (! remainingSeconds) {
            return "0 Seconds"
        }
        
        const year = 365 * 24 * 60 * 60
        const month = 30 * 24 * 60 * 60
        const day = 24 * 60 * 60
        const hour = 60 * 60
        const minute = 60
      
        const years = Math.floor(remainingSeconds / year)
        remainingSeconds %= year
        const months = Math.floor(remainingSeconds / month)
        remainingSeconds %= month
        const days = Math.floor(remainingSeconds / day)
        remainingSeconds %= day
        const hours = Math.floor(remainingSeconds / hour)
        remainingSeconds %= hour
        const minutes = Math.floor(remainingSeconds / minute)
      
        const timeParts = []
        if (years) timeParts.push(`${years} Year${years > 1 ? 's' : ''}`)
        if (months) timeParts.push(`${months} Month${months > 1 ? 's' : ''}`)
        if (days) timeParts.push(`${days} Day${days > 1 ? 's' : ''}`)
        if (hours) timeParts.push(`${hours} Hour${hours > 1 ? 's' : ''}`)
        if (minutes) timeParts.push(`${minutes} Minute${minutes > 1 ? 's' : ''}`)
      
        return timeParts.join(', ')
    }

    const strDiff = formatTimeDifference(diff)

    return (
        <Card>
            {props.LocationName}
            <p>Capacity: {props.LastCount} out of {props.TotalCapacity}</p>
            <p> Last Updated: {strDiff} ago</p> 
        </Card>
    )

}

export default Location