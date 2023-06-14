import Link from "next/link";
import { useSearchParams } from 'next/navigation'

export default function Location() {
    const searchParams = useSearchParams();
    const currentTown = searchParams.get('search');

    return (
        <>
            <h1>{currentTown}</h1>
            <h2>
                <Link href="/">Search again</Link>
            </h2>
        </>
    );
}