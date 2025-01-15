/* Locations.jsx */
import { Row, Col, Form, Dropdown } from "react-bootstrap";
import { useState, useMemo } from 'react';

import Location from "./Location";
import '../styles/locations.css';
import normalizeData from "../helpers/normalizeData";

const Locations = (props) => {
  const [query, setQuery] = useState('');
  // Initialize selectedFilters with all available filter types.
  const [selectedFilters, setSelectedFilters] = useState(["Gym", "Library", "Other"]);

  const normalized = useMemo(() => {
    return normalizeData(props.data, props.emsData);
  }, [props.data, props.emsData]);

  const filteredData = useMemo(() => {
    let data = normalized;
    if (query.trim() !== "") {
      data = data.filter(location =>
        location.name.toLowerCase().includes(query.toLowerCase()) ||
        location.facility.toLowerCase().includes(query.toLowerCase()) ||
        location.type.toLowerCase().includes(query.toLowerCase()) ||
        (location.events &&
          location.events.some(event =>
            event.name.toLowerCase().includes(query.toLowerCase())
          ))
      );
    }
    // Filter by selected filters.
    data = data.filter(location => selectedFilters.includes(location.type));
    return data;
  }, [normalized, query, selectedFilters]);

  const handleFilterChange = (filterValue) => {
    setSelectedFilters(prev =>
      prev.includes(filterValue)
        ? prev.filter(f => f !== filterValue)
        : [...prev, filterValue]
    );
  };

  return (
    <div>
      {/* Container for search and filter controls */}
      <div className="search-filter-container mx-auto mb-3">
        <Row className="align-items-center no-gutters">
          <Col xs={8} md={9} className="pr-1">
            <Form.Group controlId="searchLocations">
              <Form.Control
                type="text"
                placeholder="Search locations, facilities, or events..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col xs={4} md={3} className="pl-1 text-end">
            <Dropdown>
              <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                Filters
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Form.Check
                  type="checkbox"
                  label="Gym"
                  id="filter-gym"
                  checked={selectedFilters.includes("Gym")}
                  onChange={() => handleFilterChange("Gym")}
                  className="mx-3 my-1"
                />
                <Form.Check
                  type="checkbox"
                  label="Library"
                  id="filter-library"
                  checked={selectedFilters.includes("Library")}
                  onChange={() => handleFilterChange("Library")}
                  className="mx-3 my-1"
                />
                <Form.Check
                  type="checkbox"
                  label="Other"
                  id="filter-other"
                  checked={selectedFilters.includes("Other")}
                  onChange={() => handleFilterChange("Other")}
                  className="mx-3 my-1"
                />
              </Dropdown.Menu>
            </Dropdown>
          </Col>
        </Row>
      </div>

      {filteredData.length === 0 ? (
        <p>No results were found.</p>
      ) : (
        <Row className="location-container g-4">
          {filteredData.map(location => (
            <Col sm={12} md={6} lg={4} key={location.id} className="d-flex">
              <Location {...location} />
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};

export default Locations;
