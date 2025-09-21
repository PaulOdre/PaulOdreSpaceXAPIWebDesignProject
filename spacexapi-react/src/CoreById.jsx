import { useParams } from "react-router-dom"
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
function CoreById(props) {
  const [ loading, setLoading ] = useState(true);
  const [ core, setCore ] = useState(undefined);
  let params = useParams();
  let coreId = params.id;
  useEffect(() => {
    axios.get(`https://api.spacexdata.com/v4/cores/${coreId}`).then(({ data }) => {
      setCore(data)
      setLoading(false)
    }).catch((e) => {
      setLoading(false)
    })
  }, [coreId]);
  if (loading) return <div>Loading Core...</div>
  else{
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
          {core.launches.map((launch) => <li key={launch}><NavLink to={`/launches/${launch}`}>{launch}</NavLink></li>)}
          </ul>}
        </div>
        </>}
      </>
    )}
}

export default CoreById