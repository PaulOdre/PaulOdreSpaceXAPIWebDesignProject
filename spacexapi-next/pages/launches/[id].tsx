import { useParams } from "next/navigation";
import Link from "next/link";
import axios from 'axios';
export default function LaunchPage(props) {
  /*let params = useParams()
  let pageNo = params.page
  let index = pageNo - 1*/
  let launch = props.data
  let launchId = props.id
  return (
    <>
    {!launch && <><h1>Error 404</h1>
    <p>Launch of ID {launchId} Not Found</p></>}
    {launch && <><h1>{launch.name}</h1>
    {launch.links.flickr.original.length != 0 && <img fetchpriority="high" className='shrinkMain' src={launch.links.flickr.original[0]} alt={`${launch.name} Launch`}/>}
    <div>
    <h2>Details</h2>
    <p>{launch.details ? launch.details : "No description provided"}</p>
    </div>
    <div>
      <p>Flight Number: {launch.flight_number ? launch.flight_number : "None"}</p>
      <p>ID: {launch.id}</p>
      <p>Success?: {launch.success ? "Yes" : "No"}</p>
      <p>Rocket: {launch.rocket ? <Link href={`/rockets/${launch.rocket}`}>{launch.rocket}</Link> : "None"}</p>
      <p>Launchpad: {launch.launchpad ? <Link href={`/launchpads/${launch.launchpad}`}>{launch.launchpad}</Link> : "None"}</p>
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
        {launch.payloads.map((payload) => <li key={payload}> <Link href={`/payloads/${payload}`}>{payload}</Link></li>)}
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
        {launch.fairings.ships.map((ship) => <li key={`${ship}`}><Link href={`/ships/${ship}`}>{ship}</Link></li>)}
       </ul>
      }       
      </>
      }
    </div>
    {launch.cores.length !=0  &&
      <div>
      <h2>Cores</h2>
      <ul>
        {launch.cores.map((core) => <li key={core.core? core.core : "none"}>{core.core ? <Link href={`/cores/${core.core}`}>{core.core}</Link> : "None"}</li>)}
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
        {launch.ships.map((ship) => <li key={ship}><Link href={`/ships/${ship}`}>{ship}</Link></li>)}
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
    { launch.links.patch.large && <div><img fetchpriority="high" className= "shrinkBottom" src={launch.links.patch.large} alt={`${launch.name} Patch`}/></div>}
    </>}
  </>
  );
}
export async function getStaticPaths() {
  const {data} = await axios.get('https://api.spacexdata.com/v4/launches')
  const paths = data.map((launch) => {
    return {
      params: {id: launch.id}
    }
  })
  //console.log(paths)
  return {
    paths: paths,
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  const {id} = params
  const {data} = await axios.get(`https://api.spacexdata.com/v4/launches/${id}`)
  return {props: {data,id}}
}