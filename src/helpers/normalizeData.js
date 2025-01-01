/* normalizeData.js */

/**
 * Normalizes data from different APIs to have the properties listed below:
 * @param {List[Object]} data the data to be normalized
 * @param {string} name the name of the region/location
 * @param {string} facility the name of the facility that contains the region/location
 * @param {string} lastUpdated when this data was logged, in ISO 8601 format
 * @param {int} count how many people are at the region/location
 * @param {int} capacity how many people max can fit in the region/location
 * @returns {List[Object]} the normalized data, serialized into JSON
 */
export default function normalizeData(data, name=null, facility=null, lastUpdated=null, count=null, capacity=null) {

    let normalized = []
    let id = 0

    for (let obj of data) {

        const normObj = {}
        normObj.id = id++

        /* Data came from gyms API */
        if (Object.hasOwn(obj, 'FacilityId')) {
            normObj.name = name ? name : obj.LocationName
            normObj.facility = facility ? facility : obj.FacilityName
            normObj.type = 'Gym'
            normObj.lastUpdated = lastUpdated ? lastUpdated : obj.LastUpdatedDateAndTime
            normObj.count = count ? count : obj.LastCount
            normObj.capacity = capacity ? capacity : obj.TotalCapacity
        }

        /* Data came from College Library API */
        else {
            switch (obj.name) {
                case '2191': normObj.name = 'College Library 2nd Floor'
                break
                case '2250 / Computer Lab': normObj.name = 'College Library 2nd Floor Computer Lab'
                break
                case '3191': normObj.name = "College Library 3rd Floor"
                break
                case '3250 / WisCEL': normObj.name = 'College Library 3rd Floor Computer Lab'
                break
                default: normObj.name = 'College Library, Unknown Location'
            }
            normObj.facility = facility ? facility : 'College Library'
            normObj.type = 'Library'
            normObj.lastUpdated = lastUpdated ? lastUpdated : new Date().toISOString()
            normObj.count = count ? count : obj.people
            normObj.capacity = capacity ? capacity : obj.capacity
        }

        normalized.push(normObj)

    }

    return JSON.stringify(normalized)

}