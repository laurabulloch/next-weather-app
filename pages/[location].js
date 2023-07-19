import Link from "next/link";
import styles from '../styles/Home.module.css';
import Head from "next/head";

async function fetchWeather(lat, lon) {
    const response = await fetch("https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=" + process.env.NEXT_PUBLIC_WEATHER_API_KEY)
    if (!response.ok) {
        throw new Error('Failed to fetch weather data')
    }
    const data = await response.json();

    return data.main.temp;
}

export const getServerSideProps = async ({params}) => {
    const res = await fetch("https://api.openweathermap.org/geo/1.0/direct?q=" + params.location + "&limit=1&appid=" + process.env.NEXT_PUBLIC_WEATHER_API_KEY)

    if (!res.ok) {
        throw new Error('Failed to fetch weather data')
    }
    const data = await res.json()

    const lat = await data[0].lat;
    const lon = await data[0].lon;

    const temperature = await fetchWeather(lat, lon);

    return { props:
            {
                locationName: params.location,
                locationLat: lat,
                locationLon: lon,
                locationTemp: temperature,
                locationData: data,
            }
    }
}

export default function Location(props) {
    const temperature = props.locationTemp - 273.15;

    return (
        <div className={styles.container}>
            <Head>
                <title>{props.locationName} Next Weather App</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <h1>{props.locationName}</h1>
            <h2>The temperature is currently {Math.round(temperature)} &deg;C</h2>
            <h2>
                <Link href="/">Search another location</Link>
            </h2>
        </div>
        )
}