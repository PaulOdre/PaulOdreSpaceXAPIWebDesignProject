import axios from 'axios'
import Link from 'next/link';
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home(props) {
  let history = props.dataHis
  let company = props.dataCom
  return (
    <>
      <h1>Home Page</h1>
      <p>This site currently operates to be able to access SpaceX's API for the purposes
        of obtaining information on their Launches, Payloads, Cores, Rockets, Ships, and Launchpads via
        the navigation links at the bottom of the page.</p>
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
  );
}
export async function getStaticProps() {
  const {data: dataHis} = await axios.get('https://api.spacexdata.com/v4/history')
  const {data: dataCom} = await axios.get('https://api.spacexdata.com/v4/company')
  return {props: {dataHis,dataCom}}
}