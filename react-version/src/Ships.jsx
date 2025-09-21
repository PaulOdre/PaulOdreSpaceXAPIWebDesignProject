import { useParams } from "react-router-dom"
import { NavLink } from "react-router-dom";
function Ships(props) {
  let params = useParams();
  let pageNo = params.page
  let index = pageNo - 1
  if (index < 0) return (<><h1>Error 404</h1> <p>Page number out of range (Less than 1)</p></>)
  let ships = props.ships
  let firstInd = index * 10
  let lastInd = firstInd + 10
  if (lastInd > ships.length) lastInd = ships.length
  let lastPage = false
  if (lastInd == ships.length) lastPage = true;
  let pageArr = ships.slice(firstInd, lastInd)
  //console.log(pageArr)
  if (pageArr.length == 0) return (<><h1>Error 404</h1> <p>Page number out of range (No more ships)</p></>)
  return (
    <>
      <h1>Ships Page {pageNo}</h1>
      <ul>
      {pageArr && pageArr.map((ship) => 
        <li key={ship.id}><NavLink key={ship.id} to={`/ships/${ship.id}`}>Ship Name: {ship.name}</NavLink></li>
        )}
      </ul>
      <div>
      { firstInd != 0 && <NavLink to={`/ships/page/${parseInt(pageNo)-1}`} className="button">
        Previous
      </NavLink>}
      { !lastPage && <NavLink to={`/ships/page/${parseInt(pageNo)+1}`} className="button">
        Next
      </NavLink>}
      </div>
    </>
  )
}

export default Ships