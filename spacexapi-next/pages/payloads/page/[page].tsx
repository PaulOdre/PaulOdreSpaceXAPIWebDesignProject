import Link from "next/link";
import axios from 'axios';
export default function PayloadPage(props) {
  /*let params = useParams()
  let pageNo = params.page
  let index = pageNo - 1*/
  const {pageArr} = props
  const {page} = props
  const {firstInd} = props
  const {lastPage} = props
  return (
    <>
      <h1>Payloads Page {page}</h1>
      <ul>
      {pageArr && pageArr.map((payload) => 
        <li key={payload.id}><Link key={payload.id} href={`/payloads/${payload.id}`}>Payload Name: {payload.name}</Link></li>
        )}
      </ul>
      <div>
      { firstInd != 0 && <Link href={`/payloads/page/${parseInt(page)-1}`} className="button">
        Previous
      </Link>}
      { !lastPage && <Link href={`/payloads/page/${parseInt(page)+1}`} className="button">
        Next
      </Link>}
      </div>
    </>
  );
}
export async function getStaticPaths() {
  const {data} = await axios.get('https://api.spacexdata.com/v4/payloads')
  let i = 1
  let paths = []
  while (i<Math.ceil(data.length/10)+1) {
    paths.push({params: {page: `${i}`}})
    i++
  }
  //console.log(paths)
  //console.log(data.length)
  return {
    paths: paths,
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  const {page} = params
  const {data} = await axios.get('https://api.spacexdata.com/v4/payloads')
  let index = page - 1
  let firstInd = index * 10
  let lastInd = firstInd + 10
  if (lastInd > data.length) lastInd = data.length
  let lastPage = false
  if (lastInd == data.length) lastPage = true;
  let pageArr = data.slice(firstInd, lastInd)
  return {props: {pageArr, page, firstInd, lastPage }}
}