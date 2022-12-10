import "../App.css"
import React from 'react';
import { useState, useEffect } from "react";
import useFetchNews from '../hooks/useFetchNews';
import NewCard from '../components/NewCard';

const News = () => {

const [filter,setFilter] = useState("")
 

    const { news, isPending, error } = useFetchNews(filter);
    console.log(news);




    return (

        <div className="container mt-14">
            <div className="flex">
                <h3 className={filter === "handpicked" ? "bg-orange-500  tags":"tags"} onClick={() =>{
                    setFilter("handpicked")
                }}>
                    <span className="text-orange-700">#</span> Handpicked
                </h3>
                <h3 className={filter === "trending" ? "bg-orange-500  tags":"tags"} onClick={() =>{
                    setFilter("trending")
                }}>
                    <span className="text-orange-700">#</span> Trending
                </h3>
                <h3 className={filter === "latest" ? "bg-orange-500  tags":"tags"} onClick={() =>{
                    setFilter("latest")
                }}>
                    <span className="text-orange-700">#</span> Latest
                </h3>
                <h3 className={filter === "bullish" ? "bg-orange-500  tags":"tags"} onClick={() =>{
                    setFilter("bullish")
                }}>
                    <span className="text-orange-700">#</span> Bullish
                </h3>
                <h3 className={filter === "bearish" ? "bg-orange-500  tags":"tags"} onClick={() =>{
                    setFilter("bearish")
                }}>
                    <span className="text-orange-700">#</span> Bearish
                </h3>
            </div>


            <div class="grid md:grid-cols-4 sm:grid-cols-12">
                {error && <p>{error}</p>}
              {isPending ? <p>LOADING...</p>:<NewCard data={news} key={news.id}/>}


            </div>
        </div>
    );
}

export default News;