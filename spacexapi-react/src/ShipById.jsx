import { useParams } from "react-router-dom"
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
function ShipById(props) {
  const [ loading, setLoading ] = useState(true);
  const [ ship, setShip ] = useState(undefined);
  let params = useParams();
  let shipId = params.id;
  useEffect(() => {
    axios.get(`https://api.spacexdata.com/v4/ships/${shipId}`).then(({ data }) => {
      setShip(data)
      setLoading(false)
    }).catch((e) => {
      setLoading(false)
    })
  }, [shipId]);
  if (loading) return <div>Loading Ship...</div>
  else{
    return (
      <>
        {!ship && <><h1>Error 404</h1>
        <p>Ship of ID {shipId} Not Found</p></>}
        {ship && <><h1>{ship.name}</h1>
        { ship.image != null && <div><img className= "shrinkMain" src={ship.image} alt={`${ship.name}`}/></div>}
        <div>
          <h2>Details</h2>
          <p>Home Port: {ship.home_port != null && ship.home_port != "" ? ship.home_port : "N/A"}</p>
          <p>Status: {ship.status != null && ship.status != "" ? ship.status : "N/A"}</p>
          <p>Active?: {ship.active ? "Yes" : "No"}</p>
          <p>Last AIS Update: {ship.last_ais_update != null ? ship.last_ais_update : "N/A"}</p>
          <p>Year Built: {ship.year_built != null ? ship.year_built : "N/A"}</p>
          <p>Model: {ship.model != null ? ship.model : "N/A"}</p>
          <p>Type: {ship.type != null ? ship.type : "N/A"}</p>
          <p>Class: {ship.class != null ? ship.class : "N/A"}</p>
          <p>Mass (kg): {ship.mass_kg != null ? ship.mass_kg : "N/A"}</p>
          <p>Speed (knots): {ship.speed_kn != null ? ship.speed_kn : "N/A"}</p>
          <p>Course (degrees): {ship.course_deg != null ? ship.course_deg : "N/A"}</p>
          <p>Latitude: {ship.latitude != null ? ship.latitude : "N/A"} | Longitude: {ship.longitude != null ? ship.longitude : "N/A"}</p>
          <p>Link: {ship.link != null ? <a href={ship.link}>{ship.link}</a> : "N/A"}</p>
        </div>
        <div>
          <h2>Roles</h2>
          {ship.roles.length == 0 ? <p>None</p> :
          <ul> 
            {ship.roles.map((role) => <li key={role}>{role}</li>)}
          </ul>}
        </div>
        <div>
          <h2>Launches</h2>
          {ship.launches.length == 0 ? <p>None</p> :
          <ul> 
            {ship.launches.map((launch) => <li key={launch}><NavLink to={`/launches/${launch}`}>{launch}</NavLink></li>)}
          </ul>}
        </div>
        <div>
          <h2>IDs</h2>
          <ul>
            <li>ID: {ship.id}</li>
            <li>Legacy ID: {ship.legacy_id != null ? ship.legacy_id : "N/A"}</li>
            <li>IMO ID: {ship.imo != null ? ship.imo : "N/A"}</li>
            <li>MMSI ID: {ship.mmsi != null ? ship.mmsi : "N/A"}</li>
            <li>ABS ID: {ship.abs != null ? ship.abs : "N/A"}</li>
          </ul>
        </div>
        </>}
      </>
    )}
}

export default ShipById