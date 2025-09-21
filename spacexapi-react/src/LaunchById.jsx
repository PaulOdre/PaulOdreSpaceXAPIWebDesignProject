import { useParams } from "react-router-dom"
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
function LaunchById(props) {
  const [ loading, setLoading ] = useState(true);
  const [ launch, setLaunch ] = useState(undefined);
  let params = useParams();
  let launchId = params.id;
  //let launchLoading = true;
  useEffect(() => {
    //console.log("getting launch data")
    axios.get(`https://api.spacexdata.com/v4/launches/${launchId}`).then(({ data }) => {
      setLaunch(data)
      setLoading(false)
    }).catch((e) => {
      setLoading(false)
    })
  }, [launchId]);
  //console.log(loading)
  //console.log(launch)
  //I TRIED to get the YouTube embed thing to work, but I couldn't, so I just used the link instead, sorry
  //console.log(launch)
  if (loading) return <div>Loading Launch...</div>
  else {
    return (
      <>
        {!launch && <><h1>Error 404</h1>
        <p>Launch of ID {launchId} Not Found</p></>}
        {launch && <><h1>{launch.name}</h1>
        {launch.links.flickr.original.length != 0 && <img className='shrinkMain' src={launch.links.flickr.original[0]} alt={`${launch.name} Launch`}/>}
        <div>
        <h2>Details</h2>
        <p>{launch.details ? launch.details : "No description provided"}</p>
        </div>
        <div>
          <p>Flight Number: {launch.flight_number ? launch.flight_number : "None"}</p>
          <p>ID: {launch.id}</p>
          <p>Success?: {launch.success ? "Yes" : "No"}</p>
          <p>Rocket: {launch.rocket ? <NavLink to={`/rockets/${launch.rocket}`}>{launch.rocket}</NavLink> : "None"}</p>
          <p>Launchpad: {launch.launchpad ? <NavLink to={`/launchpads/${launch.launchpad}`}>{launch.launchpad}</NavLink> : "None"}</p>
          <p>Net?: {launch.net ? "Yes" : "No"}</p>
          <p>Windows: {launch.windows ? launch.windows : "N/A"}</p>
          <p>Local Date: {launch.date_local ? `${launch.date_local.split("T")[0]} | Local Time: ${launch.date_local.split("T")[1]}` : "None"}</p>
          <p>To Be Determined?: {launch.tbd ? "Yes" : "No"}</p>
          <p>Upcoming?: {launch.upcoming ? "Yes" : "No"}</p>
          <p>Static Fire Date (UTC): {launch.static_fire_date_utc ? `${launch.static_fire_date_utc.split("T")[0]} | Static Fire Time (UTC): ${launch.static_fire_date_utc.split("T")[1]}` : "None"}</p>
          <p>Article: {launch.links.article ? <a href={launch.links.article}>{launch.links.article}</a> : "None"}</p>
          <p>Webcast: {launch.links.webcast ? <a href={launch.links.webcast}>{launch.links.webcast}</a> : "None"}</p>
          <p>Presskit: {launch.links.presskit ? <a href={launch.links.presskit}>{launch.links.presskit}</a> : "None"}</p>
          <p>Wikipedia: {launch.links.wikipedia ? <a href={launch.links.wikipedia}>{launch.links.wikipedia}</a> : "None"}</p>
          <p>Reddit Links:</p>
          {launch.links.reddit ? 
          <ul>
            {["Campaign", "Launch", "Media", "Recovery"].map((item) => 
              <li key={item}>{item}: {launch.links.reddit[item.toLowerCase()] ? <a href = {launch.links.reddit[item.toLowerCase()]}>{launch.links.reddit[item.toLowerCase()]}</a> : "N/A"}</li>
            )}
          </ul>
          : "None"}
        </div>
        <div>
          <h2>Failures</h2>
          {launch.failures.length == 0 ? <p>None</p> : 
          <ul>
            {launch.failures.map((failure) => <li key={`${failure.reason}${failure.time}`}>
              <p>Time: {failure.time ? failure.time : "N/A"}</p>
              <p>Altitude: {failure.altitude ? failure.altitude : "N/A"}</p>
              <p>Reason: {failure.reason ? failure.reason : "N/A"}</p>
            </li>)}
          </ul>}
        </div>
        {launch.capsules.length !=0  &&
          <div>
          <h2>Capsules</h2>
          <ul>
            {launch.capsules.map((capsule) => <li key={capsule}>{capsule}</li>)}
          </ul>
          </div>}
        {launch.capsules.length == 0  &&
          <div>
            <h2>Capsules</h2>
            <p>None</p>
          </div>
        }
        {launch.payloads.length !=0  &&
          <div>
          <h2>Payloads</h2>
          <ul>
            {launch.payloads.map((payload) => <li key={payload}> <NavLink to={`/payloads/${payload}`}>{payload}</NavLink></li>)}
          </ul>
          </div>}
        {launch.payloads.length == 0  &&
          <div>
            <h2>Payloads</h2>
            <p>None</p>
          </div>
        }
        <div>
          <h2>Payload Fairings</h2>
          {!launch.fairings ? "No information available" :
          <> 
          <p>Recovered?: {launch.fairings.recovered ? "Yes" : "No"}</p>
          <p>Recovery Attempts Made?: {launch.fairings.recovered ? "Yes" : "No"}</p>
          <p>Reused?: {launch.fairings.reused ? "Yes" : "No"}</p>
          <h4>Ships Used In Recovery</h4>
          {launch.fairings.ships.length == 0 ? <p>None</p> :
           <ul>
            {launch.fairings.ships.map((ship) => <li key={`${ship}`}><NavLink to={`/ships/${ship}`}>{ship}</NavLink></li>)}
           </ul>
          }       
          </>
          }
        </div>
        {launch.cores.length !=0  &&
          <div>
          <h2>Cores</h2>
          <ul>
            {launch.cores.map((core) => <li key={core.core? core.core : "none"}>{core.core ? <NavLink to={`/cores/${core.core}`}>{core.core}</NavLink> : "None"}</li>)}
          </ul>
          </div>}
        {launch.cores.length == 0  &&
          <div>
            <h2>Cores</h2>
            <p>None</p>
          </div>
        }
        {launch.ships.length !=0  &&
          <div>
          <h2>Ships</h2>
          <ul>
            {launch.ships.map((ship) => <li key={ship}><NavLink to={`/ships/${ship}`}>{ship}</NavLink></li>)}
          </ul>
          </div>
          }
        {launch.ships.length ==0  &&
          <div>
            <h2>Ships</h2>
            <p>None</p>
          </div>
        }
        {launch.crew.length !=0  &&
          <div>
          <h2>Crew</h2>
          <ul>
            {launch.crew.map((member) => <li key={member}>{member}</li>)}
          </ul>
          </div>
          }
        {launch.crew.length ==0  &&
          <div>
            <h2>Crew</h2>
            <p>None</p>
          </div>
        }
        { launch.links.patch.large && <div><img className= "shrinkBottom" src={launch.links.patch.large} alt={`${launch.name} Patch`}/></div>}
        </>}
      </>
    )}
}

export default LaunchById