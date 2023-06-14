import Link from "next/link";
import { useSearchParams } from 'next/navigation'
import {useEffect} from "react";

export default function Location() {
    const searchParams = useSearchParams();
    const currentTown = searchParams.get('search');

    useEffect(() => {
        // eslint-disable-next-line no-undef
        // axios.get(process.env.REACT_APP_API_URL + '/to-dos').then((response) => {
        //     setToDos(response.data);
        // });
        try {
            const res = fetch("http://api.openweathermap.org/geo/1.0/direct?q=" + currentTown + "&limit=1&appid=12345")
                .then(response => response.json())
                .then(data => console.log(data))
        } catch (err) {
            console.log(err);
        }
    }, []);

    return (
        <>
            <h1>{currentTown}</h1>
            <h2>
                <Link href="/">Search again</Link>
            </h2>
        </>
    );
}
