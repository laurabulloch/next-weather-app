import Head from 'next/head';
import styles from '../styles/Home.module.css';
import {useState} from "react";
import Link from "next/link";

export default function Home() {
    const [currentTown, setCurrentTown] = useState('');
    const [enteredTown, setEnteredTown] = useState('');
    const handleSearch = () => {
        setCurrentTown(enteredTown)
    };
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
               <Link href="/location">
                   <button id="btn" onClick={handleSearch}>Go</button>
               </Link>
          </div>

          <p className={styles.description}>
              {currentTown}
          </p>


      </main>
      </div>
  )
}
