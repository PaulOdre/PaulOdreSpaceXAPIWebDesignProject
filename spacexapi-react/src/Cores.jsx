import { useParams } from "react-router-dom"
import { NavLink } from "react-router-dom";
function Cores(props) {
  let params = useParams();
  let pageNo = params.page
  let index = pageNo - 1
  if (index < 0) return (<><h1>Error 404</h1> <p>Page number out of range (Less than 1)</p></>)
  let cores = props.cores
  let firstInd = index * 10
  let lastInd = firstInd + 10
  if (lastInd > cores.length) lastInd = cores.length
  let lastPage = false
  if (lastInd == cores.length) lastPage = true;
  let pageArr = cores.slice(firstInd, lastInd)
  //console.log(pageArr)
  if (pageArr.length == 0) return (<><h1>Error 404</h1> <p>Page number out of range (No more cores)</p></>)
  return (
    <>
      <h1>Cores Page {pageNo}</h1>
      <ul>
      {pageArr && pageArr.map((core) => 
        <li key={core.id}><NavLink key={core.id} to={`/cores/${core.id}`}>Core Serial: {core.serial}</NavLink></li>
        )}
      </ul>
      <div>
      { firstInd != 0 && <NavLink to={`/cores/page/${parseInt(pageNo)-1}`} className="button">
        Previous
      </NavLink>}
      { !lastPage && <NavLink to={`/cores/page/${parseInt(pageNo)+1}`} className="button">
        Next
      </NavLink>}
      </div>
    </>
  )
}

export default Cores