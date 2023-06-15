import Link from "next/link";
import { useSearchParams } from 'next/navigation'
import {useEffect, useState} from "react";

export default function Location() {

    const searchParams = useSearchParams();
    const currentTown = searchParams.get('search');
    const [lat, setLat] = useState(0);
    const [lon, setLon] = useState(0);
    const [temperature, setTemperature] = useState(0);

    // useEffect(() => {
    //     try {
    //         const res = fetch("https://api.openweathermap.org/geo/1.0/direct?q=" + currentTown + "&limit=1&appid=" + process.env.NEXT_PUBLIC_WEATHER_API_KEY)
    //             .then(response => response.json())
    //             .then(data =>
    //                 setData(data)
    //             )
    //     } catch (err) {
    //         console.log(err);
    //     }
    //     ;
    //     console.log(data);
    //
    // }, []);

    useEffect(() => {
        async function fetchLocation() {
            const response = await fetch("https://api.openweathermap.org/geo/1.0/direct?q=" + currentTown + "&limit=1&appid=" + process.env.NEXT_PUBLIC_WEATHER_API_KEY)
            if (!response.ok) {
                // This will activate the closest `error.js` Error Boundary
                throw new Error('Failed to fetch location data')
            }
            return response.json();

        }

        const getLongLat = async () => {
            const fetchedData = await fetchLocation();
            const longitude = fetchedData[0].lon;
            const latitude = fetchedData[0].lat;
            setLon(longitude);
            setLat(latitude);
        };

        async function fetchWeather() {
            const response = await fetch("https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=" + process.env.NEXT_PUBLIC_WEATHER_API_KEY)
            if (!response.ok) {
                // This will activate the closest `error.js` Error Boundary
                throw new Error('Failed to fetch weather data')
            }
            return response.json();

        }

        const getTemperature = async () => {
            await getLongLat();
            const fetchedData = await fetchWeather();
            const kelvin = fetchedData.main.temp;
            const temperature = kelvin - 273
            setTemperature(temperature);
        };

        // const fetchTemperature = async (lat,lon) => {
        //     try {
        //         //...
        //         return responseData.sectors;
        //     } catch (err) {}
        // };

        // const fetchData = async () => {
        //     await getLongLat();
        //     const tempLoadedContent = await fetchLocation();
        //     const tempLoadedSectors = await fetchSectors(tempLoadedContent[0].id);
        //     setLoadedContent(tempLoadedContent);
        //     setLoadedSectors(tempLoadedSectors);
        // };


        getTemperature();
    }, []);


    return (
        <>
            <h1>{currentTown}</h1>
            <h2>{lon}</h2>
            <h2>{lat}</h2>
            <h2>{temperature}</h2>
            <h2>
                <Link href="/">Search again</Link>
            </h2>
        </>
    );
}