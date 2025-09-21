import { useParams } from "react-router-dom"
import { NavLink } from "react-router-dom";
function Rockets(props) {
  let params = useParams();
  let pageNo = params.page
  let index = pageNo - 1
  if (index < 0) return (<><h1>Error 404</h1> <p>Page number out of range (Less than 1)</p></>)
  let rockets = props.rockets
  let firstInd = index * 10
  let lastInd = firstInd + 10
  if (lastInd > rockets.length) lastInd = rockets.length
  let lastPage = false
  if (lastInd == rockets.length) lastPage = true;
  let pageArr = rockets.slice(firstInd, lastInd)
  //console.log(pageArr)
  if (pageArr.length == 0) return (<><h1>Error 404</h1> <p>Page number out of range (No more rockets)</p></>)
  return (
    <>
      <h1>Rockets Page {pageNo}</h1>
      <ul>
      {pageArr && pageArr.map((rocket) =>         
        <li key={rocket.id}><NavLink key={rocket.id} to={`/rockets/${rocket.id}`}>Rocket Name: {rocket.name} { rocket.flickr_images.length != 0 && <div><img className= "shrinkRock" src={rocket.flickr_images[0]} alt={`${rocket.name}`}/></div>}</NavLink></li>        
        )}
      </ul>
      <div>
      { firstInd != 0 && <NavLink to={`/rockets/page/${parseInt(pageNo)-1}`} className="button">
        Previous
      </NavLink>}
      { !lastPage && <NavLink to={`/rockets/page/${parseInt(pageNo)+1}`} className="button">
        Next
      </NavLink>}
      </div>
    </>
  )
}

export default Rockets