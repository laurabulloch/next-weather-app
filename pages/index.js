import Head from 'next/head';
import styles from '../styles/Home.module.css';
import {useState} from "react";
import Link from "next/link";

export default function Home() {
    const [currentTown, setCurrentTown] = useState('');
    const [lat, setLat] = useState(0);
    const [lon, setLon] = useState(0);

    async function getData() {
        const response = await fetch("https://api.openweathermap.org/geo/1.0/direct?q=" + currentTown + "&limit=1&appid=" + process.env.NEXT_PUBLIC_WEATHER_API_KEY)
        if (!response.ok) {
            // This will activate the closest `error.js` Error Boundary
            throw new Error('Failed to fetch data')
        }
        return response.json();

    }

    const getLongLat = async () => {
        const fetchedData = await getData();
        const longitude = fetchedData[0].lon;
        const latitude = fetchedData[0].lat;
        setLon(longitude);
        setLat(latitude);
    };

    return (
        <div className={styles.container}>

            <Head>
                <title>Next Weather App</title>
                <link rel="icon" href="/favicon.ico"/>
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
                        value={currentTown}
                        onChange={(event) => setCurrentTown(event.target.value)}
                    />
                    <Link href={{
                        pathname: "/location",
                        query: {
                            search: currentTown,
                            longitude: lon,
                            latitude: lat
                        }
                    }}
                    >
                        <button id="btn" onClick={getLongLat}>Go</button>
                    </Link>
                </div>

            </main>
        </div>
    )
}
