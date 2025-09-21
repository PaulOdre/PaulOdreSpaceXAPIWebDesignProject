import Link from "next/link";
import axios from 'axios';
export default function PayloadIdPage(props) {
  /*let params = useParams()
  let pageNo = params.page
  let index = pageNo - 1*/
  let payload = props.data
  let payloadId = props.id
  return (
    <>
      {!payload && <><h1>Error 404</h1>
      <p>Payload of ID {payloadId} Not Found</p></>}
      {payload && <><h1>{payload.name}</h1>
      <div>
        <h2>Details</h2>
        <p>ID: {payload.id}</p>
        <p>Type: {payload.type ? payload.type : "N/A"}</p>
        <p>Reused?: {payload.reused ? "Yes" : "No"}</p>
        <p>Launch: <Link href={`/launches/${payload.launch}`}>{payload.launch ? payload.launch : "N/A"}</Link></p>
        <p>Mass (kg): {payload.mass_kg ? payload.mass_kg : "N/A"}</p>
        <p>Orbit: {payload.orbit ? payload.orbit : "N/A"}</p>
        <p>Reference System: {payload.reference_system ? payload.reference_system : "N/A"}</p>
        <p>Regime: {payload.regime ? payload.regime : "N/A"}</p>
        <p>Longitude: {payload.longitude ? payload.longitude : "N/A"}</p>
        <p>Semi Major Axis (km): {payload.semi_major_axis_km ? payload.semi_major_axis_km : "N/A"}</p>
        <p>Eccentricity: {payload.eccentricity ? payload.eccentricity : "N/A"}</p>
        <p>Periapsis (km): {payload.periapsis_km ? payload.periapsis_km : "N/A"}</p>
        <p>Apoapsis (km): {payload.apoapsis_km ? payload.apoapsis_km : "N/A"}</p>
        <p>Inclination (degrees): {payload.inclination_deg ? payload.inclination_deg : "N/A"}</p>
        <p>Period (minutes): {payload.period_min ? payload.period_min : "N/A"}</p>
        <p>Lifespan (years): {payload.lifespan_years ? payload.lifespan_years : "N/A"}</p>
        <p>Epoch Date: {payload.epoch ? `${payload.epoch.split("T")[0]} | Epoch Time: ${payload.epoch.split("T")[1]}` : "N/A"}</p>
        <p>Mean Motion: {payload.mean_motion ? payload.mean_motion : "N/A"}</p>
        <p>Right Ascension of the Ascending Node (RAAN): {payload.raan ? payload.raan : "N/A"}</p>
        <p>Argument of Pericenter: {payload.arg_of_pericenter ? payload.arg_of_pericenter : "N/A"}</p>
        <p>Mean Anomaly: {payload.mean_anomaly ? payload.mean_anomaly : "N/A"}</p>
      </div>
      <div>
        <h2>Capsule</h2>
        {!payload.dragon.capsule ? <p>None</p> : 
        <ul>
          <li>Capsule: {payload.dragon.capsule ? payload.dragon.capsule : "N/A"}</li>
          <li>Mass Returned (kg): {payload.dragon.mass_returned_kg ? payload.dragon.mass_returned_kg : "N/A"}</li>
          <li>Flight Time (sec): {payload.dragon.flight_time_sec ? payload.dragon.flight_time_sec : "N/A"}</li>
          <li>Manifest: {payload.dragon.manifest ? <a href={payload.dragon.manifest}>{payload.dragon.manifest}</a> : "N/A"}</li>
          <li>Water Landing?: {payload.dragon.water_landing ? "Yes" : "No"}</li>
          <li>Land Landing?: {payload.dragon.land_landing ? "Yes" : "No"}</li>
        </ul>}
      </div>
      <div>
        <h2>Customers</h2>
        {payload.customers.length == 0 ? <p>None</p> :
        <ul>
        {payload.customers.map((customer) => <li key={customer}>{customer}</li>)}
        </ul>}
      </div>
      <div>
        <h2>Nationalities</h2>
        {payload.nationalities.length == 0 ? <p>None</p> :
        <ul>
        {payload.nationalities.map((nation) => <li key={nation}>{nation}</li>)}
        </ul>}
      </div>
      <div>
        <h2>Manufacturers</h2>
        {payload.manufacturers.length == 0 ? <p>None</p> :
        <ul>
        {payload.manufacturers.map((manufacturer) => <li key={manufacturer}>{manufacturer}</li>)}
        </ul>}
      </div>
      <div>
        <h2>Norad IDs</h2>
        {payload.norad_ids.length == 0 ? <p>None</p> :
        <ul>
        {payload.norad_ids.map((norad) => <li key={norad}>{norad}</li>)}
        </ul>}
      </div>
      </>}
    </>
  );
}
export async function getStaticPaths() {
  const {data} = await axios.get('https://api.spacexdata.com/v4/payloads')
  const paths = data.map((payload) => {
    return {
      params: {id: payload.id}
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
  const {data} = await axios.get(`https://api.spacexdata.com/v4/payloads/${id}`)
  return {props: {data,id}}
}