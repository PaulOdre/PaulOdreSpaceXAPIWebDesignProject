import { useParams } from "next/navigation";
import Link from "next/link";
import axios from 'axios';
export default function LaunchpadIdPage(props) {
  /*let params = useParams()
  let pageNo = params.page
  let index = pageNo - 1*/
  let launchpad = props.data
  let launchpadId = props.id
  return (
    <>
      {!launchpad && <><h1>Error 404</h1>
      <p>Launchpad of ID {launchpadId} Not Found</p></>}
      {launchpad && <><h1>{launchpad.name}</h1> <h3>{launchpad.full_name != null ? launchpad.full_name : "No Full Name"}</h3>
      { launchpad.images.large != null && <div><img fetchpriority="high" className= "shrinkMain" src={launchpad.images.large} alt={`${launchpad.name}`}/></div>}
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
          {launchpad.rockets.map((rocket) => <li key={rocket}><Link href={`/rockets/${rocket}`}>{rocket}</Link></li>)}
        </ul>}
      </div>
      <div>
        <h2>Launches</h2>
        {launchpad.launches.length == 0 ? <p>None</p> :
        <ul> 
          {launchpad.launches.map((launch) => <li key={launch}><Link href={`/launches/${launch}`}>{launch}</Link></li>)}
        </ul>}
      </div>
      </>}
    </>
  );
}
export async function getStaticPaths() {
  const {data} = await axios.get('https://api.spacexdata.com/v4/launchpads')
  const paths = data.map((launchpad) => {
    return {
      params: {id: launchpad.id}
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
  const {data} = await axios.get(`https://api.spacexdata.com/v4/launchpads/${id}`)
  return {props: {data,id}}
}