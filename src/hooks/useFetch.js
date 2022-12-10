import { useEffect, useState } from 'react';
import * as Axios from 'axios';

 
const useFetch = (coin, currency) => {

    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        Axios.get(`https://api.coinstats.app/public/v1/coins/${coin}?currency=${currency}`)
            .then(
                (response) => {
                   
                    setData(response.data.coin);
                    setIsPending(false);
                    setError(null);
                }
            ).catch(error => {
                setIsPending(false);
                setError(error.message);

            })

    }, [coin,currency])

    return {data,isPending,error}
}

export default useFetch;