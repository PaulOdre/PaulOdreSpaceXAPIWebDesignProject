import { useParams } from "react-router-dom"
import { NavLink } from "react-router-dom";
function Payloads(props) {
  let params = useParams();
  let pageNo = params.page
  let index = pageNo - 1
  if (index < 0) return (<><h1>Error 404</h1> <p>Page number out of range (Less than 1)</p></>)
  let payloads = props.payloads
  let firstInd = index * 10
  let lastInd = firstInd + 10
  if (lastInd > payloads.length) lastInd = payloads.length
  let lastPage = false
  if (lastInd == payloads.length) lastPage = true;
  let pageArr = payloads.slice(firstInd, lastInd)
  //console.log(pageArr)
  if (pageArr.length == 0) return (<><h1>Error 404</h1> <p>Page number out of range (No more payloads)</p></>)
  return (
    <>
      <h1>Payloads Page {pageNo}</h1>
      <ul>
      {pageArr && pageArr.map((payload) => 
        <li key={payload.id}><NavLink key={payload.id} to={`/payloads/${payload.id}`}>Payload Name: {payload.name}</NavLink></li>
        )}
      </ul>
      <div>
      { firstInd != 0 && <NavLink to={`/payloads/page/${parseInt(pageNo)-1}`} className="button">
        Previous
      </NavLink>}
      { !lastPage && <NavLink to={`/payloads/page/${parseInt(pageNo)+1}`} className="button">
        Next
      </NavLink>}
      </div>
    </>
  )
}

export default Payloads