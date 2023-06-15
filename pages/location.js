import Link from "next/link";
import { useSearchParams } from 'next/navigation'
import {useEffect, useState} from "react";

export default function Location() {

    const searchParams = useSearchParams();
    const currentTown = searchParams.get('search');
    const lon = searchParams.get('longitude');
    const lat = searchParams.get('latitude');

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

    return (
        <>
            <h1>{currentTown}</h1>
            <h2>{lon}</h2>
            <h2>{lat}</h2>
            <h2>
                <Link href="/">Search again</Link>
            </h2>
        </>
    );
}