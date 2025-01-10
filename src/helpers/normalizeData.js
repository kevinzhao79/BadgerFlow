/* normalizeData.js */
import { formatHHMM } from '../helpers/formatTime'

/**
 * Normalizes the Activity Data from Gym/Library APIs
 * @param {List[Object]} activityData the activity data to be normalized
 * @returns the normalized data
 */
function normalizeActivityData(activityData) {
    let normalized = []
    let id = 0

    for (let obj of activityData) {

        const normObj = {}
        normObj.id = id++

        /* Data came from gyms API */
        if (Object.hasOwn(obj, 'FacilityId')) {
            normObj.name = obj.LocationName
            normObj.facility = obj.FacilityName
            normObj.type = 'Gym'
            normObj.lastUpdated = obj.LastUpdatedDateAndTime
            normObj.count = obj.LastCount
            normObj.capacity = obj.TotalCapacity
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
            normObj.facility = 'College Library'
            normObj.type = 'Library'
            normObj.lastUpdated = new Date().toISOString()
            normObj.count = obj.people
            normObj.capacity = obj.capacity
        }

        /* Stores EMS Cloud events for that particular location */
        normObj.events = []

        normalized.push(normObj)

    }
    
    return normalized
}

/**
 * 
 * @param {Object} data the data to be turned into a Location
 * @returns {Object} the Location
 */
function createLocation(data, event, id) {

    const location = {}
    location.id = id
    location.name = data.Room
    location.facility = data.Building
    location.lastUpdated = new Date().toISOString()
    location.count = 0
    location.capacity = 0
    location.events = [event]
    
    switch (data.Building) {
        case ('NICK') : 
        case ('BAKKE') : 
        case ('NTS') : location.type = 'Gym'; break
        case ('MEM') : 
        case ('STEEN') : 
        case ('COLL') : location.type = 'Library'; break
        default: location.type = 'Other'; break
    }

    return location

}

/**
 * 
 * @param {Map(string : Location)} locations A hashmap containing the activityData Location's names to the Locations itself
 * @param {List[Object]} emsData EMS Cloud data, which will be added to locations
 * @returns {List[Location]} locations after the EMS Cloud data is added to each associated Location
 */
function normalizeEMSData(locations, emsData) {

    let idCounter = 1000

    for (let event of emsData) {

        // console.log(event)

        /* Extract only the relevant parts of the original event */
        const newEvent = {
            name : event.EventName, 
            room : event.Room, 
            start : formatHHMM(event.EventStart), 
            end : formatHHMM(event.EventEnd), 
        }

        /* If the event occurs in a pre-existing Location, add its event name, start time, and end time to Location.events */
        /* Switch statement is necessary as EMS Cloud room names do not line up with Activity Data room names, even when referencing the same room */
        switch (event.Room) {

            case ('Power House') : locations.get('Nick Power House').events.push(newEvent); break
            case ('Sprint Ramp') : 
            case ('Functional Training') :
            case ('Courts 1 - 2') : locations.get('Nick Courts 1 & 2').events.push(newEvent); break
            case ('Courts 3 - 6') : locations.get('Nick Courts 3-6').events.push(newEvent); break
            case ('Courts 7 - 8') : locations.get('Nick Courts 7 & 8').events.push(newEvent); break
            case ('Track') : locations.get('Nick Track').events.push(newEvent); locations.get('Bakke Track').events.push(newEvent); break
            case ('Racquetball Court 1') : locations.get('Nick Racquetball Court 1').events.push(newEvent); break
            case ('Racquetball Court 2') : locations.get('Nick Racquetball Court 2').events.push(newEvent); break
            case ('Diving Well') :
            case ('Aquatic Center Dryland Training') : locations.get('Soderholm Family Aquatic Center').events.push(newEvent); break

            case ('Courts 1 - 2') : locations.get('Courts 1&2').events.push(newEvent); break
            case ('Courts 3 - 4') : locations.get('Courts 3&4').events.push(newEvent); break
            case ('Courts 5 - 8') : locations.get('Courts 5-8').events.push(newEvent); break
            case ('Simulator 1') :
            case ('Simulator 2') :
            case ('Simulator 3') : locations.get('Skybox Suites').events.push(newEvent); break
            case ('Esports Room') : locations.get('Esports Room').events.push(newEvent); break
            case ('The Rooftop') : locations.get('The Point').events.push(newEvent); break
            case ('Willow Deck') : locations.get('Willow Room').events.push(newEvent); break
            case ('Sub-Zero Ice Rink') : locations.get('Sub Zero Ice Center').events.push(newEvent); break
            case ('Pool - 25yd Lane 1') : 
            case ('Pool - 25yd Lane 2') : 
            case ('Pool - 25yd Lane 3') : 
            case ('Pool - 25yd Lane 4') : 
            case ('Pool - 25yd Lane 5') : 
            case ('Pool - 25yd Lane 6') : 
            case ('Pool - 25yd Lane 7') : 
            case ('Pool - 25yd Lane 8') : 
            case ('Cove Pool') : locations.get('Cove Pool').events.push(newEvent); break
            case ('Mt Mendota') : locations.get('Mount Mendota').events.push(newEvent); break
            case ('Orbit') : locations.get('Orbit').events.push(newEvent); break

            case ('Level 1 Fitness') :
                if (event.Building === 'BAKKE') { locations.get('Level 1 Fitness').events.push(newEvent); break }
                else if (event.Building === 'NICK') { locations.get('Nick Level 1 Fitness').events.push(newEvent); break }
            case ('Level 2 Fitness') :
                if (event.Building === 'BAKKE') { locations.get('Level 2 Fitness').events.push(newEvent); break }
                else if (event.Building === 'NICK') { locations.get('Nick Level 2 Fitness').events.push(newEvent); break }
            case ('Level 3 Fitness') : 
            if (event.Building === 'BAKKE') { locations.get('Level 3 Fitness').events.push(newEvent); break }
            else if (event.Building === 'NICK') { locations.get('Nick Level 3 Fitness').events.push(newEvent); break }
            case ('Level 3 Fitness - North') : { locations.get('Nick Level 3 Fitness').events.push(newEvent); break }
            case ('Level 3 Fitness - South') : { locations.get('Nick Level 3 Fitness').events.push(newEvent); break }
            case ('Level 4 Fitness') : { locations.get('Level 4 Fitness').events.push(newEvent); break }

            case ('Court 1') :
                if (event.Building === 'BAKKE') { locations.get('Courts 1&2').events.push(newEvent); break }
                else if (event.Building === 'NICK') { locations.get('Nick Courts 1 & 2').events.push(newEvent); break }
            case ('Court 2') :
                if (event.Building === 'BAKKE') { locations.get('Courts 1&2').events.push(newEvent); break }
                else if (event.Building === 'NICK') { locations.get('Nick Courts 1 & 2').events.push(newEvent); break }
            case ('Court 3') :
                if (event.Building === 'BAKKE') { locations.get('Courts 3&4').events.push(newEvent); break }
                else if (event.Building === 'NICK') { locations.get('Nick Courts 3 - 6').events.push(newEvent); break }
            case ('Court 4') :
                if (event.Building === 'BAKKE') { locations.get('Courts 3&4').events.push(newEvent); break }
                else if (event.Building === 'NICK') { locations.get('Nick Courts 3 - 6').events.push(newEvent); break }
            case ('Court 5') :
                if (event.Building === 'BAKKE') { locations.get('Courts 5-8').events.push(newEvent); break }
                else if (event.Building === 'NICK') { locations.get('Nick Courts 3 - 6').events.push(newEvent); break }
            case ('Court 6') :
                if (event.Building === 'BAKKE') { locations.get('Courts 5-8').events.push(newEvent); break }
                else if (event.Building === 'NICK') { locations.get('Nick Courts 3 - 6').events.push(newEvent); break }
            case ('Court 7') :
                if (event.Building === 'BAKKE') { locations.get('Courts 5-8').events.push(newEvent); break }
                else if (event.Building === 'NICK') { locations.get('Nick Courts 7 & 8').events.push(newEvent); break }
            case ('Court 8') :
                if (event.Building === 'BAKKE') { locations.get('Courts 5-8').events.push(newEvent); break }
                else if (event.Building === 'NICK') { locations.get('Nick Courts 7 & 8').events.push(newEvent); break }

            case ('College 2191B Study Room') : locations.get('College Library 2nd Floor').events.push(newEvent); break
            case ('College 2251 Study Room') : locations.get('College Library 2rd Floor Computer Lab').events.push(newEvent); break
            case ('College 3191B Study Room') : locations.get('College Library 3rd Floor').events.push(newEvent); break
            case ('College 3251 Study Room') : locations.get('College Library 3rd Floor Computer Lab').events.push(newEvent); break

            /* If not, create a new Location, add its event name, start time, and end time to Location.events */
            default: 
                if (typeof locations.get(event.Room) === 'object') {
                    locations.get(event.Room).events.push(newEvent)
                }
                else {
                    const location = createLocation(event, newEvent, idCounter++)
                    locations.set(location.name, location)
                }

        }

    }

    return Array.from(locations.values())

}

function removeDuplicateEvents(locations) {

    for (let location of locations) {

        const stringifiedMap = new Map(location.events.map(event => [JSON.stringify(event), event])).values()
        const uniqueEvents = Array.from(stringifiedMap)
        location.events = uniqueEvents

    }

}

/**
 * Normalizes and combines data from different APIs to create Objects that can be rendered into Location components
 * @param {List[Object]} activityData Gym/Library data
 * @param {List[Object]} emsData EMS Cloud data
 * @returns {List[Object]} the normalized and combined data, serialized into JSON
 */
function normalizeData(activityData, emsData) {

    /* Normalize Activity data */
    const normalized = normalizeActivityData(activityData)

    /* Map Location.name -> Location object in a hashmap */
    const normalizedHash = new Map(normalized.map(location => [location.name, location]))

    /* Parse through EMS Cloud data and map facility/room to location.name */
    /* Add fields to Location to include EMS Cloud data activities and their start/end times */
    const locations = normalizeEMSData(normalizedHash, emsData)

    removeDuplicateEvents(locations)

    // console.log(locations)

    return locations

}

export default normalizeData