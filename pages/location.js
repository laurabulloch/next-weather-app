import Link from "next/link";
import { useSearchParams } from 'next/navigation'
import {useEffect, useState} from "react";

export default function Location() {

    const searchParams = useSearchParams();
    const currentTown = searchParams.get('search');
    const [lat, setLat] = useState(0);
    const [lon, setLon] = useState(0);
    const [temperature, setTemperature] = useState(0);

    useEffect(() => {
        async function fetchLocation() {
            const response = await fetch("https://api.openweathermap.org/geo/1.0/direct?q=" + currentTown + "&limit=1&appid=" + process.env.NEXT_PUBLIC_WEATHER_API_KEY)
            if (!response.ok) {
                // This will activate the closest `error.js` Error Boundary
                throw new Error('Failed to fetch location data')
            }
            return response.json();

        }

        async function fetchWeather(lat, lon) {
            console.log(lon);
            console.log(lat);
            const response = await fetch("https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=" + process.env.NEXT_PUBLIC_WEATHER_API_KEY)
            if (!response.ok) {
                // This will activate the closest `error.js` Error Boundary
                throw new Error('Failed to fetch weather data')
            }
            return response.json();

        }

        const getData = async () => {
            const fetchedLocationData = await fetchLocation();
            const longitude = fetchedLocationData[0].lon;
            const latitude = fetchedLocationData[0].lat;
            setLon(longitude);
            setLat(latitude);

            const fetchedData = await fetchWeather(latitude, longitude);
            const kelvin = fetchedData.main.temp;
            const temperature = kelvin - 273.15
            setTemperature(temperature);
        };


        getData();
    }, []);


    return (
        <>
            <h1>{currentTown}</h1>
            <h2>{lon}</h2>
            <h2>{lat}</h2>
            <h2>The temperature today is {Math.round(temperature)} &deg;C</h2>
            <h2>
                <Link href="/">Search again</Link>
            </h2>
        </>
    );
}