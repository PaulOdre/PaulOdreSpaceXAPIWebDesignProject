import { NavLink } from "react-router-dom"
function Navigation(props) {
  
  return (
    <ul>
      <li>
        <NavLink to='/launches/page/1'>
          Launches
        </NavLink>
      </li>
      <li>
        <NavLink to='/payloads/page/1'>
          Payloads
        </NavLink>
      </li>
      <li>
        <NavLink to='/cores/page/1'>
          Cores
        </NavLink>
      </li>
      <li>
        <NavLink to='/rockets/page/1'>
          Rockets
        </NavLink>
      </li>
      <li>
        <NavLink to='/ships/page/1'>
          Ships
        </NavLink>
      </li>
      <li>
        <NavLink to='/launchpads/page/1'>
          Launchpads
        </NavLink>
      </li>
    </ul>
  )
}

export default Navigation