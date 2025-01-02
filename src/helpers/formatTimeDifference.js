/* timeDiff.js */

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

    if (timeParts.length === 0) {
        return 'Less than 1 second'
    }
  
    return timeParts.join(', ')
}

export default formatTimeDifference