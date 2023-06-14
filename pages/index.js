import Head from 'next/head';
import styles from '../styles/Home.module.css';
import {useState} from "react";
import Link from "next/link";

export default function Home() {
    const [enteredTown, setEnteredTown] = useState('');


  return (
    <div className={styles.container}>

      <Head>
        <title>Next Weather App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
          <h1 className={styles.title}>
              Your Weather
          </h1>

          <p className={styles.description}>
              Get started by typing a town into the search box below
          </p>

          <div>
              <input
                  type="text"
                  id="location"
                  placeholder="Enter Town"
                  value = {enteredTown}
                  onChange = {(event) => setEnteredTown(event.target.value)}
              />
               <Link href={{
                   pathname: "/location",
                   query: {
                       search: enteredTown
                   }
               }}
               >
                   <button id="btn">Go</button>
               </Link>
          </div>

      </main>
      </div>
  )
}
