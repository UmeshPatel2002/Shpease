import React, { useState , useEffect } from 'react'
import './Popular.css'
import Item from '../Items/Item'


const Popular=()=> {
  const [data_product,setData_product]=useState([])

  const popularitem=async()=>{
    await fetch('http://localhost:4000/popularinwomen')
    .then((res)=>res.json())
    .then((data)=>setData_product(data))
    .catch((error) => console.error('Error fetching popular items:', error));
  }

  useEffect(()=>{
    popularitem();
  },[])

  return (
    <div className='popular'>
        <h1>POPULAR IN WOMEN</h1>
        <hr/>
        <div className='popular-item'>
        {data_product.map((item, i) => {
        return (
            <Item
              key={i}
              id={item.id}
              name={item.name}
              image={item.image}
              new_price={item.new_price}
              old_price={item.old_price}
            />
         );
        })}
        </div>
    </div>
  )
}

export default Popular