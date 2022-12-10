import { useEffect, useState } from 'react';
import * as Axios from 'axios';

 
const useFetchNews = (filter) => {

    const [news, setNews] = useState([]);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

   
const fltr = filter === undefined ? "" : filter
    useEffect(() => {
        Axios.get(`https://api.coinstats.app/public/v1/news${"/"+fltr}?skip=0`)
            .then(
                (response) => {
                   
                    setNews(response.data.news);
                    setIsPending(false);
                    setError(null);
                }
            ).catch(error => {
                setIsPending(false);
                setError(error.message);

            })

    }, [fltr])

    return {news,isPending,error}
}

export default useFetchNews;