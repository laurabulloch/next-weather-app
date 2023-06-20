import Link from "next/link";

// async function fetchLocation(location) {
//     const response = await fetch("https://api.openweathermap.org/geo/1.0/direct?q=" + location + "&limit=1&appid=" + process.env.NEXT_PUBLIC_WEATHER_API_KEY)
//     if (!response.ok) {
//         throw new Error('Failed to fetch location data')
//     }
//     return response.json();
//
// }
//
// // export async function getServerSideProps(context) {
// //     const { location } = context.query;
// //     console.log(location);
// //     const response = await fetch("https://api.openweathermap.org/geo/1.0/direct?q=" + location + "&limit=1&appid=" + process.env.NEXT_PUBLIC_WEATHER_API_KEY)
// //     if (!response.ok) {
// //         throw new Error('Failed to fetch location data')
// //     }
// //     const data = await response.json
// //     const dataSerialized = data.toJSON
// //
// //     return { props:  {dataSerialized},  };
// // }
//
// // async function fetchWeather(lat, lon) {
// //     const response = await fetch("https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=" + process.env.NEXT_PUBLIC_WEATHER_API_KEY)
// //     if (!response.ok) {
// //         throw new Error('Failed to fetch weather data')
// //     }
// //     return response.json();
// //
// // }
//
// async function getData(location){
//
//     console.log(location)
//
//     const locationData = await fetchLocation(location);
//
//     // const longitude = await fetchedLocationData.lon;
//     // const latitude = await fetchedLocationData.lat;
//
//     return locationData
// }



// export default function Location() {
//     const [temperature, setTemperature] = useState(0);
//     const searchParams = useSearchParams();
//     const location = searchParams.get('location')
//
//     const locationData = getData(location);
//
//     const longitude = locationData.lon;
//     const latitude = locationData.lat;
//
//     console.log(locationData)
//     console.log(latitude)
//
//     // const kelvin = weatherData.main.temp;
//     // setTemperature(kelvin - 273.15);
//
//     return (
//         <>
//             <h1>{location}</h1>
//             <h1>{longitude}</h1>
//             <h1>{latitude}</h1>
//             <h2>The temperature is currently {Math.round(temperature)} &deg;C</h2>
//             <h2>
//                 <Link href="/">Search another location</Link>
//             </h2>
//         </>
//     );
// }

export const getServerSideProps = async ({params}) => {

    const res = await fetch("https://api.openweathermap.org/geo/1.0/direct?q=" + params.location + "&limit=1&appid=" + process.env.NEXT_PUBLIC_WEATHER_API_KEY)

    if (!res.ok) {
        throw new Error('Failed to fetch weather data')
    }
    const data = await res.json()
    return { props:
            {
                locationName: data[0].name,
                locationLat: data[0].lat,
                locationLon: data[0].lon
            }
    }
}

export default function Location(props) {

    return (
        <div>
            <h1>{props.locationName}</h1>
            <h1>{props.locationLat}</h1>
            <h1>{props.locationLon}</h1>
            {/*<h2>The temperature is currently {Math.round(temperature)} &deg;C</h2>*/}
            <h2>
                <Link href="/">Search another location</Link>
            </h2>
        </div>
        )
}