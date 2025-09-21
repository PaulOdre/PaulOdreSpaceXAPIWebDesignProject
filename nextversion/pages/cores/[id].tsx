import { useParams } from "next/navigation";
import Link from "next/link";
import axios from 'axios';
export default function CoreIdPage(props) {
  /*let params = useParams()
  let pageNo = params.page
  let index = pageNo - 1*/
  let core = props.data
  let coreId = props.id
  return (
    <>
      {!core && <><h1>Error 404</h1>
      <p>Core of Serial {coreId} Not Found</p></>}
      {core && <><h1>Core {core.serial}</h1>
      <div>
        <h2>Details</h2>
        <p>ID: {core.id}</p>
        <p>Status: {core.status ? core.status : "N/A"}</p>
        <p>Last Update: {core.last_update ? core.last_update : "N/A"}</p>
        <p>Block: {core.block ? core.block : "N/A" }</p>
        <p>Reuse Count: {core.reuse_count}</p>
        <p>Return to Launch Site (RtLS) Attempts: {core.rtls_attempts} | RtLS Landings: {core.rtls_landings}</p>
        <p>Autonomous Spaceport Drone Ship (ASDS) Attempts: {core.asds_attempts} | ASDS Landings: {core.asds_landings}</p>
      </div>
      <div>
        <h2>Launches</h2>
        {core.launches.length == 0 ? <p>None</p> :
        <ul>
        {core.launches.map((launch) => <li key={launch}><Link href={`/launches/${launch}`}>{launch}</Link></li>)}
        </ul>}
      </div>
      </>}
    </>
  );
}
export async function getStaticPaths() {
  const {data} = await axios.get('https://api.spacexdata.com/v4/cores')
  const paths = data.map((core) => {
    return {
      params: {id: core.id}
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
  const {data} = await axios.get(`https://api.spacexdata.com/v4/cores/${id}`)
  return {props: {data,id}}
}