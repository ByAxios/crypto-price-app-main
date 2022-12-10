import React ,{useState} from "react";
import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";

const Details = () => {
    const { id } = useParams()
   
    const [pair, setPair] = useState("USD");
    const { data, isPending, error } = useFetch(id, pair);
    
    console.log(data);

 
  

    return (
        <div className="container">
            <select 
             value={pair}
              onChange={(event)=>{setPair(event.target.value);}} 
            name="pair" 
            id="pairs">
                <option value="TRY">TRY</option>
                <option value="USD">USD</option>
                <option value="AUD">AUD</option>
                <option value="JPY">JPY</option>
                <option value="EUR">EUR</option>
            </select>
            {isPending && <div><p>Loading...</p></div>}
            {error && <div>{error}</div>}

            {data && (
                <div className="page">


                    <div className="flex items-center">
                        <img src={data.icon} alt={data.id} />
                        <div className="text-3xl ml-2">{data.name}</div>
                        <p className="text-sm">({data.symbol})</p>

                    </div>
                    <h1 className="text-4xl">{data.price}</h1>

                    <div className="flex">
                        <p className="font-semibold">Hacim: </p>
                        <h2 className="ml-2">{data.volume.toFixed(4)}</h2>
                    </div>
                    <div className="flex">
                        <p className="font-semibold">Market Cap: </p>
                        <h2 className="ml-2">{data.marketCap}</h2>
                    </div>

                    <div className="flex">
                        <p className="font-semibold">Price Change: </p>
                        {
                            data.priceChange1d.toString().charAt(0) === "-"
                                ?
                                <h1 className="text-red-600 ml-2">{data.priceChange1d}%</h1>
                                :
                                <h1 className="text-green-600 ml-2">{data.priceChange1d}%</h1>
                        }
                    </div>

                    <h2 className="font-semibold">Social links:</h2>
                    <div>
                        {data.exp.map(el => <a rel="noopener noreferrer" target="_blank" className="block" key={el.id} href={el}>{el}</a>)}
                        <a className="block" href={data.websiteUrl}>{data.websiteUrl}</a>
                        <a className="block" href={data.twitterUrl}>{data.twitterUrl}</a>
                    </div>


                </div>
            )}

        </div>
    );
}

export default Details;