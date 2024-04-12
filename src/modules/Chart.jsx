import React, { useState } from 'react'

import { convertData } from '../helpers/converData';
import {CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, YAxis}from 'recharts'

import styles from './Chart.module.css'

function Chart({chart ,setChart}) {
  
  const[type,setType]=useState("prices")
 

  const typeHandelr=(event)=>{
    if(event.target.tagName==="BUTTON"){
      const type =event.target.innerText.toLowerCase().replace(" ","_")
      setType(type);
    }
  }

  return (
    <div className={styles.container}>
      <span  className={styles.cross} onClick={()=>setChart(false)}>
        X
        </span>
        <div className={styles.chart}>
          <div className={styles.name}>
            <img src={chart.coins.image} />
            <p>{chart.coins.name}</p>
          </div>



         <div className={styles.graph}>
          <Chartcomponet  data={convertData(chart ,type)} type={type}/>
         </div>
          <div className={styles.types} onClick={typeHandelr}>
            <button className={type==="prices" ?styles.seleetd:null}>Prices</button>
            <button className={type==="market_caps"?styles.seleetd:null}>Market Caps</button>
            <button className={type==="total_volumes"?styles.seleetd:null}>Total Volumes</button>
          </div>
          <div className={styles.details}>
            <div>
              <p>Prices</p>
              <span>${chart.coins.current_price}</span>
            </div>

            <div>
              <p>Ath</p>
              <span>${chart.coins.ath}</span>
            </div>

            <div>
              <p>Market Cap:</p>
              <span>{chart.coins.market_cap}</span>
            </div>
          </div>

        </div>
      </div>
  )
}

export default Chart
const Chartcomponet=({data,type})=>{
  return( <ResponsiveContainer width="100%" height="100%">
  <LineChart 
  width={400}
   height={400} 
  data={data}>

  <Line type='monotone'
   dataKey={type}  
   stroke='#3874ff' 
   strokeWidth="2px"/>

  <CartesianGrid stroke='#404042' />

  <YAxis dataKey={type} domain={["auto","auto"]}/>
  <Legend/>
  <Tooltip/>
  </LineChart >
</ResponsiveContainer>)

}