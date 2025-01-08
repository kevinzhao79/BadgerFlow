/* fetchData.js */
import axios from 'axios'

/**
 * Grabs the data for all gym-related Locations (Nick, Bakke, Shell)
 * @returns A list of Locations
 */
export const getGymData = async () => {
    const resp = await fetch('https://goboardapi.azurewebsites.net/api/FacilityCount/GetCountsByAccount?AccountAPIKey=7938FC89-A15C-492D-9566-12C961BC1F27', {
    method : 'GET'
    })
    const badgerData = await resp.json()
    return badgerData
}

/**
 * Grabs the data for all regions in College Library (2nd Floor, 2nd Floor Comp. Lab, 3rd Floor, 3rd Floor WisCEL)
 * @returns A list of regions in College Library
 */
export const getClibData = async () => {
    const resp = await fetch('https://waitz.io/live/uwmadison', {
        method : 'GET'
    })
    let libData = await resp.json()
    const regions = libData.data[0].subLocs
    return regions
}

/**
 * Grabs the data from EMS Cloud Services and normalizes it
 * @returns A list of events happening today
 */
 export const getEMSData = async () => {
    const body = JSON.stringify({
        filterData: {
          filters: [
            {filterName: "StartDate", value: "2025-01-21 00:00:00", displayValue: "", filterType: 3},  
            {filterName: "EndDate", value: "2025-01-22 00:00:00", displayValue: "", filterType: 3}, 
            {filterName: "TimeZone", value: "64", displayValue: "", filterType: 2}, 
            {filterName: "RollupEventsToReservation", value: "false", displayValue: ""}, 
            {filterName: "ResultType", value: "Daily", displayValue: ""}
          ],
        },
      })
      const headers = {'headers' : {
        'Content-Type' : 'application/json'
      }}

    const resp = await axios.post('http://localhost:3000/api/browse-events', body, headers)
    const EMSData = resp.data.d
  
    function prettify(input) {

        /* Clean data to be JSON parseable */
        let cleanedInput = input.replace(/\\"/g, '"') // Unescape double quotes
        cleanedInput = cleanedInput.replace(/(?<!\\)\n/g, '\\n') // Escape unescaped newlines
        cleanedInput = cleanedInput.replace(/,/g, ',\n') // Format commas for readability
        cleanedInput = cleanedInput.replace(/&amp;[/s]?/g, '') // Remove &amp; 
        cleanedInput = cleanedInput.replace(/&#39;/g, '')
        cleanedInput = cleanedInput.replace(/"([^"]*?)"/g, (match) => {
            return match.replace(/\n/g, ' ') // Replace newlines within each quoted string with spaces
        });
    
        return JSON.parse(cleanedInput)
    }

    return prettify(EMSData).DailyBookingResults

}