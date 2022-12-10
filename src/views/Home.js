import '../App.css';
import { useEffect, useState } from "react";
import Axios from 'axios';
import Coin from '../components/Coin';

function Home() {
  const [listOfCoins, setListOfCoins] = useState([])
  const [searchWord, setSearchWord] = useState("")

  const filteredCoins = listOfCoins.filter((coin) => {
    return coin.name.toLowerCase().includes(searchWord.toLowerCase());
  })

  useEffect(() => {
    Axios.get("https://api.coinstats.app/public/v1/coins?skip=0").then(
      (response) => {
        setListOfCoins(response.data.coins);
      }
    )
  }, []);

  useEffect(() => {
    console.log("arama filtresi değisti" + searchWord);
  }, [searchWord])

  return (
    <div className="App">
      <div className='cryptoHeader'>
        <input type="text" placeholder="Coinleri Ara"
          onChange={(event) => {
            setSearchWord(event.target.value);
          }}
        />
      </div>
     

      <div className='flex justify-center flex-wrap'>
        {filteredCoins.map((coin) => {
          return <Coin change={coin.priceChange1d} id={coin.id} name={coin.name} icon={coin.icon} price={coin.price} symbol={coin.symbol} key={coin.id} />
        })}

      </div>
    </div>
  );
}

export default Home;
