import {useEffect, useState} from "react";

interface State<T> {
    data?: T,
    error?: Error | null,
    loading: boolean
}

function useFetch <T>(url: string): State<T> {
    const [data, setData] = useState<T>();
    const [error, setError] = useState<Error | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        setLoading(true);
        fetch(url)
            .then(res => res.json())
            .then(res => setData(res))
            .catch(err => setError(err))
            .finally(() => setLoading(false))
    }, [url])

    return {data, error, loading}
}

export default useFetch;