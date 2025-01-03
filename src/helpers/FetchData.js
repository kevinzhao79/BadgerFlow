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
            {
              filterName: 'StartDate',
              value: '2025-01-21 00:00:00',
              displayValue: '',
              filterType: 3,
            },
            {
              filterName: 'EndDate',
              value: '2025-01-22 00:00:00',
              filterType: 3,
              displayValue: '',
            },
            {
              filterName: 'TimeZone',
              value: '64',
              displayValue: '',
              filterType: 2,
            },
            {
              filterName: 'RollupEventsToReservation',
              value: 'false',
              displayValue: '',
            },
            {
              filterName: 'ResultType',
              value: 'Daily',
              displayValue: '',
            },
            {
              filterName: 'Locations',
              value: '1109',
              displayValue: '',
              filterType: 8,
            },
          ],
        },
      })
      const headers = {'headers' : {
        'Content-Type' : 'application/json'
      }}

    const resp = await axios.post('http://localhost:3000/api/browse-events', body, headers)
    const EMSData = resp.data.d
  
    function prettify(input) {
    
        let cleanedInput = input.replace(/\\"/g, '"')
        cleanedInput = cleanedInput.replace(/,/g, ',\n')
        cleanedInput = cleanedInput.replace(/&amp;\s/, '')
        
        try {

            const parsedObject = JSON.parse(cleanedInput)
            return JSON.stringify(parsedObject, null, 4)

        } 
        catch (error) {

            console.error('Error parsing JSON:', error)
            return cleanedInput
        }
    }

    return prettify(EMSData)

}