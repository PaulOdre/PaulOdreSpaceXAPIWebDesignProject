import Link from "next/link";
import axios from 'axios';
export default function RocketIdPage(props) {
  /*let params = useParams()
  let pageNo = params.page
  let index = pageNo - 1*/
  let rocket = props.data
  let rocketId = props.id
  return (
    <>
      {!rocket && <><h1>Error 404</h1>
      <p>Rocket of ID {rocketId} Not Found</p></>}
      {rocket && <><h1>{rocket.name}</h1>
      { rocket.flickr_images.length != 0 && <div><img fetchpriority="high" className= "shrinkMain" src={rocket.flickr_images[0]} alt={`${rocket.name}`}/></div>}
      <div>
        <h2>Details</h2>
        <p>{rocket.description ? rocket.description : "N/A"}</p>
        <p>ID: {rocket.id}</p>
        <p>Company: {rocket.company != null ? rocket.company : "N/A"}</p>
        <p>First Flight: {rocket.first_flight != null ? rocket.first_flight : "N/A"}</p>
        <p>Country: {rocket.country != null ? rocket.country : "N/A"}</p>
        <p>Type: {rocket.type ? rocket.type : "N/A"}</p>
        <p>Active?: {rocket.active ? "Yes" : "No"}</p>
        <p>Stages: {rocket.stages}</p>
        <p>Boosters: {rocket.boosters}</p>
        <p>Cost Per Launch ($): {rocket.cost_per_launch}</p>
        <p>Success Rate (%): {rocket.success_rate_pct != null ? rocket.success_rate_pct : "N/A"}</p>
        <p>Height (meters): {rocket.height.meters ? rocket.height.meters : "N/A"}</p>
        <p>Diameter (meters): {rocket.diameter.meters ? rocket.diameter.meters : "N/A"}</p>
        <p>Mass (kg): {rocket.mass.kg ? rocket.mass.kg : "N/A"}</p>
        <p>Landing Legs: {rocket.landing_legs.number} composed of {rocket.landing_legs.material ? rocket.landing_legs.material : "N/A"}</p>
        <p>Wikipedia: {rocket.wikipedia ? <a href={rocket.wikipedia}>{rocket.wikipedia}</a> : "None"}</p>
      </div>
      <div>
        <h2>Stages</h2>
        <h3>First Stage</h3>
        <ul>
          <li>
            Thrust Sea Level (kN): {rocket.first_stage.thrust_sea_level.kN ? rocket.first_stage.thrust_sea_level.kN : "N/A"}
          </li>
          <li>
            Thrust Vacuum (kN): {rocket.first_stage.thrust_vacuum.kN ? rocket.first_stage.thrust_vacuum.kN : "N/A"}
          </li>
          <li>
            Reusable?: {rocket.first_stage.reusable? "Yes" : "No"}
          </li>
          <li>
            Engines: {rocket.first_stage.engines}
          </li>
          <li>
            Fuel Amount (tons): {rocket.first_stage.fuel_amount_tons}
          </li>
          <li>
            Burn Time (seconds): {rocket.first_stage.burn_time_sec ? rocket.first_stage.burn_time_sec : "N/A"}
          </li>
        </ul>
        <h3>Second Stage</h3>
        <ul>
          <li>
            Thrust (kN): {rocket.second_stage.thrust.kN ? rocket.second_stage.thrust.kN : "N/A"}
          </li>
          <li>
            Payload Composite Fairing: Height (meters): {rocket.second_stage.payloads.composite_fairing.height.meters ? rocket.second_stage.payloads.composite_fairing.height.meters : "N/A"} | Diameter (meters): {rocket.second_stage.payloads.composite_fairing.diameter.meters ? rocket.second_stage.payloads.composite_fairing.diameter.meters : "N/A"}
          </li>
          <li>
            Payload Option 1: {rocket.second_stage.payloads.option_1 ? rocket.second_stage.payloads.option_1 : "N/A"}
          </li>
          <li>
            Reusable?: {rocket.second_stage.reusable ? "Yes" : "No"}
          </li>
          <li>
            Engines: {rocket.second_stage.engines}
          </li>
          <li>
            Fuel Amount (tons): {rocket.second_stage.fuel_amount_tons}
          </li>
          <li>
            Burn Time (seconds): {rocket.second_stage.burn_time_sec ? rocket.second_stage.burn_time_sec : "N/A"}
          </li>
        </ul>
      </div>
      <div>
        <h2>Engines</h2>
        <p>Specific Impulse: Sea Level: {rocket.engines.isp.sea_level? rocket.engines.isp.sea_level : "N/A"} | Vacuum: {rocket.engines.isp.vacuum? rocket.engines.isp.vacuum : "N/A"}</p>
        <p>Thrust (kN): Sea Level: {rocket.engines.thrust_sea_level.kN ? rocket.engines.thrust_sea_level.kN : "N/A"} | Vacuum: {rocket.engines.thrust_vacuum.kN ? rocket.engines.thrust_vacuum.kN : "N/A"}</p>
        <p>No. of Engines: {rocket.engines.number}</p>
        <p>Type: {rocket.engines.type ? rocket.engines.type : "N/A"}</p>
        <p>Version: {rocket.engines.version ? rocket.engines.version : "N/A"}</p>
        <p>Layout: {rocket.engines.layout ? rocket.engines.layout : "N/A"}</p>
        <p>Max Engine Loss: {rocket.engines.engine_loss_max != null ? rocket.engines.engine_loss_max : "N/A"}</p>
        <p>Propellants: {rocket.engines.propellant_1 != null ? rocket.engines.propellant_1 : "N/A"} and {rocket.engines.propellant_2 != null ? rocket.engines.propellant_2 : "N/A"}</p>
        <p>Thrust to Weight Ratio: {rocket.engines.thrust_to_weight != null ? rocket.engines.thrust_to_weight : "N/A"}</p>
      </div>
      <div>
        <h2>Payload Weights</h2>
        {rocket.payload_weights.length == 0 ? <p>None</p> :
        <ul> 
        {rocket.payload_weights.map((weight) => 
          <li key={weight.id}><h3>{weight.name}</h3>
          <p>Weight ID: {weight.id}</p>
          <p>Weight (kg): {weight.kg}</p>
          </li>
        )
        }
        </ul>}
      </div>
      </>}
    </>
  );
}
export async function getStaticPaths() {
  const {data} = await axios.get('https://api.spacexdata.com/v4/rockets')
  const paths = data.map((rocket) => {
    return {
      params: {id: rocket.id}
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
  const {data} = await axios.get(`https://api.spacexdata.com/v4/rockets/${id}`)
  return {props: {data,id}}
}