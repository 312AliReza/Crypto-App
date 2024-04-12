import React, { useEffect, useState } from 'react'
import { SerchCoin } from '../services/CryptoApi'
import { RotatingLines } from 'react-loader-spinner'

import styles from './Search.module.css'

function Search({currency,setCurrency}) {
    const [text,setText]=useState("")
    const [coins,setCoins]=useState([])
    const[isLoding,setIsLoding]=useState(false)
    useEffect(()=>{
        const controller=new AbortController()
        setCoins([])
        if(!text){setIsLoding(false)
            return;
        } 
        const Search= async ()=>{
            try {
                const res=await fetch(SerchCoin(text),{signal:controller.signal})
                const json=await res.json()
                
              if(json.coins){
                setIsLoding(false)
                setCoins(json.coins)
            }
        else{
                alert(json.status.error_message)
              }
            } catch (error) {
                if(error.name!=="AbortError"){
                alert(error.message)}
            }
        }
        setIsLoding(true)
        Search()
        return()=>controller.abort()
        
    },[text])
  return (
    <div className={styles.searchBox}>
        <input type="text" placeholder='Search' value={text} onChange={e=>setText(e.target.value)}/>
        <select name={currency} onChange={e=>setCurrency(e.target.value)}>
            <option value="usd">USD</option>
            <option value="eur">EUR</option>
            <option value="jpy">JPY</option>
        </select>
      {(!!coins.length|| isLoding) &&( 
         <div className={styles.searchRisUlt}>
            {isLoding && <RotatingLines width="50px" hight="50px" strokeWidth='2' strokeColor='#3874ff'/>}
            <ul>
                {coins.map(coins=>(<li key={coins.id}>
                    <img src={coins.thumb} alt={coins.name} />
                    <p>{coins.name}</p>
                </li>))}
            </ul>
        </div>)}
    </div>
  )
}

export default Search