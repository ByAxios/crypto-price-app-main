import React from 'react';
import { Link } from 'react-router-dom';

function Coin({ id, change, name, icon, price, symbol }) {
  return (
    <Link to={`/details/${id}`}>
      <div className='coin p-3'>
        <h1 className='mt-3'>{name} </h1>
        <img className='mt-3' src={icon} alt={name} />
        <h3 className='mt-3'>Price: {price}$ </h3>
        
        {
          change.toString().charAt(0) === "-"
            ?
            <h1 className="text-red-600 mt-2">{change}%</h1>
            :
            <h1 className="text-green-600 mt-2">{change}%</h1>
        }
        <h3 className='mt-3'>Symbol: {symbol} </h3>
      </div>
    </Link>
  )
}

export default Coin;