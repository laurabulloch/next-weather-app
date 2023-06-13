import Head from 'next/head';
import styles from '../styles/Home.module.css';

export default function Home() {
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
              <input type="text" id="location" placeholder="Enter Town"/>
              <button id="btn">Go</button>
          </div>
      </main>
      </div>
  )
}
