import { useState, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom';
import Navigation from './Navigation.jsx'
import Home from './Home.jsx'
import Launches from './Launches.jsx'
import LaunchById from './LaunchById.jsx'
import Payloads from './Payloads.jsx'
import PayloadById from './PayloadById.jsx'
import Cores from './Cores.jsx'
import CoreById from './CoreById.jsx'
import Rockets from './Rockets.jsx'
import RocketById from './RocketById.jsx'
import Ships from './Ships.jsx'
import ShipById from './ShipById.jsx'
import Launchpads from './Launchpads.jsx'
import LaunchpadById from './LaunchpadById.jsx'
import axios from 'axios'
import './App.css'
//Paul Odre
//I pledge my honor that I have abided by the Stevens Honor System.
function App() {
  const [ rocketLoading, setRocketLoading ] = useState(true);
  const [ launchLoading, setLaunchLoading ] = useState(true);
  const [ payloadLoading, setPayloadLoading ] = useState(true);
  const [ coreLoading, setCoreLoading ] = useState(true);
  const [ shipLoading, setShipLoading ] = useState(true);
  const [ launchpadLoading, setLaunchpadLoading ] = useState(true);
  const [ historyLoading, setHistoryLoading ] = useState(true);
  const [ companyLoading, setCompanyLoading ] = useState(true);
  const [ rockets, setRockets ] = useState(undefined);
  const [ launches, setLaunches ] = useState(undefined);
  const [ payloads, setPayloads ] = useState(undefined);
  const [ cores, setCores ] = useState(undefined);
  const [ ships, setShips ] = useState(undefined);
  const [ launchpads, setLaunchpads ] = useState(undefined);
  const [ history, setHistory ] = useState(undefined);
  const [ company, setCompany ] = useState(undefined);

  useEffect(() => {
    axios.get('https://api.spacexdata.com/v4/rockets').then(({ data }) => {
      setRockets(data);
      setRocketLoading(false);
    })
    axios.get('https://api.spacexdata.com/v4/launches').then(({ data }) => {
      setLaunches(data);
      setLaunchLoading(false);
    })
    axios.get('https://api.spacexdata.com/v4/payloads').then(({ data }) => {
      setPayloads(data);
      setPayloadLoading(false);
    })
    axios.get('https://api.spacexdata.com/v4/cores').then(({ data }) => {
      setCores(data);
      setCoreLoading(false);
    })
    axios.get('https://api.spacexdata.com/v4/ships').then(({ data }) => {
      setShips(data);
      setShipLoading(false);
    })
    axios.get('https://api.spacexdata.com/v4/launchpads').then(({ data }) => {
      setLaunchpads(data);
      setLaunchpadLoading(false);
    })
    axios.get('https://api.spacexdata.com/v4/history').then(({ data }) => {
      setHistory(data);
      setHistoryLoading(false);
    })
    axios.get('https://api.spacexdata.com/v4/company').then(({ data }) => {
      setCompany(data);
      setCompanyLoading(false);
    })
  }, []);
  if (rocketLoading || launchLoading || payloadLoading || coreLoading || shipLoading || launchpadLoading || historyLoading || companyLoading) {
    return <div>Loading...</div>
  } 
  else {
    return (
      <>
        <Routes>
          <Route path = '/' element={<Home company={company} history={history} />} />
          <Route path = '/launches/page/:page' element={<Launches launches={launches}/>} />
          <Route path = '/launches/:id' element={<LaunchById />} />
          <Route path = '/payloads/page/:page' element={<Payloads payloads={payloads}/>} />
          <Route path = '/payloads/:id' element={<PayloadById />} />
          <Route path = '/cores/page/:page' element={<Cores cores={cores}/>} />
          <Route path = '/cores/:id' element={<CoreById />} />
          <Route path = '/rockets/page/:page' element={<Rockets rockets={rockets}/>} />
          <Route path = '/rockets/:id' element={<RocketById />} />
          <Route path = '/ships/page/:page' element={<Ships ships={ships}/>} />
          <Route path = '/ships/:id' element={<ShipById />} />
          <Route path = '/launchpads/page/:page' element={<Launchpads launchpads={launchpads}/>} />
          <Route path = '/launchpads/:id' element={<LaunchpadById />} />
        </Routes>
        <footer>
          <h2>Navigation Links</h2>
          <Navigation />
        </footer>
      </>
    );
  }
}

export default App
// <img src={rocket.flickr_images[0]}/>  //Get first image of rocket from database
// Get unordered list of rockets with ordered list of payload weights
/*
<ul>
  {rockets && rockets.map((rocket) => 
  <li key={rocket.id}>{rocket.name}
    <ol>
      Payloads
      {rocket.payload_weights.map((payload) =><li>{payload.name}</li>)}
    </ol>
  </li>)}
</ul>
*/