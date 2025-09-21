import Link from "next/link";
export default function Navigation() {
  return (
    <>
      <ul>
        <li>
          <Link href='/launches/page/1'>
            Launches
          </Link>
        </li>
        <li>
          <Link href='/payloads/page/1'>
            Payloads
          </Link>
        </li>
        <li>
          <Link href='/cores/page/1'>
            Cores
          </Link>
        </li>
        <li>
          <Link href='/rockets/page/1'>
            Rockets
          </Link>
        </li>
        <li>
          <Link href='/ships/page/1'>
            Ships
          </Link>
        </li>
        <li>
          <Link href='/launchpads/page/1'>
            Launchpads
          </Link>
        </li>
      </ul>
    </>
  );
}