import { useParams } from "react-router-dom"
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
function LaunchpadById(props) {
  const [ loading, setLoading ] = useState(true);
  const [ launchpad, setLaunchpad ] = useState(undefined);
  let params = useParams();
  let launchpadId = params.id;
  useEffect(() => {
    axios.get(`https://api.spacexdata.com/v4/launchpads/${launchpadId}`).then(({ data }) => {
      setLaunchpad(data)
      setLoading(false)
    }).catch((e) => {
      setLoading(false)
    })
  }, [launchpadId]);
  if (loading) return <div>Loading Launchpad...</div>
  else{
    return (
      <>
        {!launchpad && <><h1>Error 404</h1>
        <p>Launchpad of ID {launchpadId} Not Found</p></>}
        {launchpad && <><h1>{launchpad.name}</h1> <h3>{launchpad.full_name != null ? launchpad.full_name : "No Full Name"}</h3>
        { launchpad.images.large != null && <div><img className= "shrinkMain" src={launchpad.images.large} alt={`${launchpad.name}`}/></div>}
        <div>
          <h2>Details</h2>
          <p>{launchpad.details != null ? launchpad.details : "N/A"}</p>
          <p>ID: {launchpad.id}</p>
          <p>Status: {launchpad.status != null ? launchpad.status : "N/A"}</p>
          <p>Locality: {launchpad.locality != null ? launchpad.locality : "N/A"}</p>
          <p>Region: {launchpad.region != null ? launchpad.region : "N/A"}</p>
          <p>Timezone: {launchpad.timezone != null ? launchpad.timezone : "N/A"}</p>
          <p>Latitude: {launchpad.latitude != null ? launchpad.latitude : "N/A"} | Longitude: {launchpad.longitude != null ? launchpad.longitude : "N/A"}</p>
          <p>Launch Attempts: {launchpad.launch_attempts != null ? launchpad.launch_attempts : "N/A"}</p>
          <p>Launch Successes: {launchpad.launch_successes != null ? launchpad.launch_successes : "N/A"}</p>
        </div>
        <div>
          <h2>Rockets</h2>
          {launchpad.rockets.length == 0 ? <p>None</p> :
          <ul> 
            {launchpad.rockets.map((rocket) => <li key={rocket}><NavLink to={`/rockets/${rocket}`}>{rocket}</NavLink></li>)}
          </ul>}
        </div>
        <div>
          <h2>Launches</h2>
          {launchpad.launches.length == 0 ? <p>None</p> :
          <ul> 
            {launchpad.launches.map((launch) => <li key={launch}><NavLink to={`/launches/${launch}`}>{launch}</NavLink></li>)}
          </ul>}
        </div>
        </>}
      </>
    )}
}

export default LaunchpadById