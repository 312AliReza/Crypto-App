import React, { useEffect, useState } from 'react'
import TabelCoin from '../modules/TabelCoin'
import { GetCoinList } from '../services/CryptoApi'
import Paginatio from '../modules/Paginatio'
import Search from '../modules/Search'
import Chart from '../modules/Chart'

function HomePage() {
  const [coins,setCoins]=useState([])
  const[page,setPage]=useState(1)

  const[isLoding,setIsLoding]=useState(true)
  const[currency,setCurrency]=useState("usd")
  const[chart,setChart]=useState(false)

  useEffect(()=>{
    setIsLoding(true)
  const getData=async ()=>{
  try {
    const res =await fetch(GetCoinList(page, currency))
    const json = await res.json()
    setCoins(json)
    setIsLoding(false)
  } catch (error) {
    console.log(error);
  }
  }
  getData()
},
  [page,currency])
  return (
    <div>
      <Search currency={currency} setCurrency={setCurrency} />
      <TabelCoin  coins={coins}  isLoding={isLoding} setChart={setChart}/>
      <Paginatio page={page} setPage={setPage}/>
      {!!chart && <Chart chart={chart} setChart={setChart}/>}
      
    </div>
  )
}
 
export default HomePage