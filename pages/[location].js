import Link from "next/link";
import styles from '../styles/Home.module.css';
import Head from "next/head";
import moment from "moment-timezone";
import React from "react";
import Image from "next/image";

async function fetchWeather(lat, lon) {
    const response = await fetch("https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=" + process.env.NEXT_PUBLIC_WEATHER_API_KEY)
    if (!response.ok) {
        throw new Error('Failed to fetch weather data')
    }
    return await response.json();

}

export const getServerSideProps = async ({params}) => {
    const res = await fetch("https://api.openweathermap.org/geo/1.0/direct?q=" + params.location + "&limit=1&appid=" + process.env.NEXT_PUBLIC_WEATHER_API_KEY)

    if (!res.ok) {
        throw new Error('Failed to fetch weather data')
    }
    const data = await res.json()

    const lat = await data[0].lat;
    const lon = await data[0].lon;

    const weatherData = await fetchWeather(lat, lon);

    return { props:
            {
                locationName: params.location,
                locationLat: lat,
                locationLon: lon,
                locationWeather: weatherData,
            }
    }
}

export default function Location(props) {
    const temperature = props.locationWeather.main.temp - 273.15;
    const timezone = props.locationWeather.timezone.toString();

    return (
        <div className={styles.container}>
            <Head>
                <title>{props.locationName} Next Weather App</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <h1>{props.locationName}</h1>
            <h2>The temperature is currently {Math.round(temperature)} &deg;C</h2>

            <h2>
                <span>{(props.locationWeather.main.temp_max.toFixed(0))- 273}&deg;C</span>
                <span>{(props.locationWeather.main.temp_min.toFixed(0))-273}&deg;C</span>

                <span>{moment.unix(props.locationWeather.sys.sunrise).tz(timezone).format("LT")}</span>
                <span>{moment.unix(props.locationWeather.sys.sunset).tz(timezone).format("LT")}</span>
            </h2>
            <Image
                src={`https://openweathermap.org/img/w/${props.locationWeather.weather[0].icon}.png`}
                alt="Weather Icon"
                width={150}
                height={150}
            />

            <h3>
                <Link href="/">Search another location</Link>
            </h3>
        </div>
        )
}