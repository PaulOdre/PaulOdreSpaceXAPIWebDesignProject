function Home(props) {
  let history = props.history;
  let company = props.company;
  return (
    <>
      <h1>Home Page</h1>
      <p>This site currently operates to be able to access SpaceX's API for the purposes
        of obtaining information on their Launches, Payloads, Cores, Rockets, Ships, and Launchpads via
        the nagivation links at the bottom of the page.</p>
      <p>{company.summary? company.summary : "Summary acquisition failed"}</p>
      <h3>Some History</h3>
      {history && 
      <ul>
        {history.map((hist) =>
          <li key={hist.id}>
            <h4>{hist.title}</h4>
            <p>{hist.event_date_utc.split("T")[0]}</p>
            <p>{hist.details}</p>
          </li> 
        )}
      </ul>}
    </>
  )
}

export default Home