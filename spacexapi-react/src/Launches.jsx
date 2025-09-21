import { useParams } from "react-router-dom"
import { NavLink } from "react-router-dom";
function Launches(props) {
  let params = useParams();
  let pageNo = params.page
  let index = pageNo - 1
  if (index < 0) return (<><h1>Error 404</h1> <p>Page number out of range (Less than 1)</p></>)
  let launches = props.launches
  let firstInd = index * 10
  let lastInd = firstInd + 10
  if (lastInd > launches.length) lastInd = launches.length
  let lastPage = false
  if (lastInd == launches.length) lastPage = true;
  let pageArr = launches.slice(firstInd, lastInd)
  //console.log(pageArr)
  if (pageArr.length == 0) return (<><h1>Error 404</h1> <p>Page number out of range (No more launches)</p></>)
  return (
    <>
      <h1>Launches Page {pageNo}</h1>
      <ul>
      {pageArr && pageArr.map((launch) => 
        <li key={launch.id}><NavLink key={launch.id} to={`/launches/${launch.id}`}>Launch Name: {launch.name} | Flight Number: {launch.flight_number}{ launch.links.patch.small && <div><img className= "shrinkDown" src={launch.links.patch.small} alt={`${launch.name} Patch`}/></div>}</NavLink></li>
        )}
      </ul>
      <div>
      { firstInd != 0 && <NavLink to={`/launches/page/${parseInt(pageNo)-1}`} className="button">
        Previous
      </NavLink>}
      { !lastPage && <NavLink to={`/launches/page/${parseInt(pageNo)+1}`} className="button">
        Next
      </NavLink>}
      </div>
    </>
  )
}

export default Launches