/* fetchData.js */

/**
 * Grabs the data for all gym-related Locations (Nick, Bakke, Shell)
 * @returns A list of Locations
 */
export const getGymData = async () => {
    const resp = await fetch("https://goboardapi.azurewebsites.net/api/FacilityCount/GetCountsByAccount?AccountAPIKey=7938FC89-A15C-492D-9566-12C961BC1F27", {
    method : "GET"
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
        method : "GET"
    })
    let libData = await resp.json()
    const regions = libData.data[0].subLocs
    return regions
}