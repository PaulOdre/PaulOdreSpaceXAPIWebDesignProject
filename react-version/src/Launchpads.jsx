import { useParams } from "react-router-dom"
import { NavLink } from "react-router-dom";
function Launchpads(props) {
  let params = useParams();
  let pageNo = params.page
  let index = pageNo - 1
  if (index < 0) return (<><h1>Error 404</h1> <p>Page number out of range (Less than 1)</p></>)
  let launchpads = props.launchpads
  let firstInd = index * 10
  let lastInd = firstInd + 10
  if (lastInd > launchpads.length) lastInd = launchpads.length
  let lastPage = false
  if (lastInd == launchpads.length) lastPage = true;
  let pageArr = launchpads.slice(firstInd, lastInd)
  //console.log(pageArr)
  if (pageArr.length == 0) return (<><h1>Error 404</h1> <p>Page number out of range (No more launchpads)</p></>)
  return (
    <>
      <h1>Launchpads Page {pageNo}</h1>
      <ul>
      {pageArr && pageArr.map((launchpad) =>         
        <li key={launchpad.id}><NavLink key={launchpad.id} to={`/launchpads/${launchpad.id}`}>Launchpad Name: {launchpad.name} { launchpad.images.large != null && <div><img className= "shrinkRock" src={launchpad.images.large} alt={`${launchpad.name}`}/></div>}</NavLink></li>
        )}
      </ul>
      <div>
      { firstInd != 0 && <NavLink to={`/launchpads/page/${parseInt(pageNo)-1}`} className="button">
        Previous
      </NavLink>}
      { !lastPage && <NavLink to={`/launchpads/page/${parseInt(pageNo)+1}`} className="button">
        Next
      </NavLink>}
      </div>
    </>
  )
}

export default Launchpads