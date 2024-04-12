import React from 'react' 
import chartUp from "../assets/chart-up.svg"
import chartDoWn from "../assets/chart-down.svg"
import { RotatingLines } from 'react-loader-spinner'
import styles from './TabelCoin.module.css'
import { marketChart } from '../services/CryptoApi'

function TabelCoin({coins,isLoding ,setChart}) {
  
  return (
    <div className={styles.container}>
      {isLoding ?<RotatingLines strokeColor='#3874ff' strokeWidth='2'/>:
      (<table className={styles.tabel}>
      <thead>
        <tr>
          <th>Coin</th>
          <th>Name</th>
          <th>Price</th>
          <th>24h</th>
          <th>Total Volume</th>
          <th> </th>
        </tr>
      </thead>
      <tbody>
       {coins.map(coins=>(
      <TableRow coins={coins} key={coins.id} setChart={setChart}/>
      ))}
      </tbody>
      </table>)}
      </div>
  )
}

export default TabelCoin

const TableRow= (
  {coins,setChart})=>{
    const {  id
      ,name
    ,image
    ,symbol,
    current_price
    ,price_change_percentage_24h
    ,total_volume}=coins

    const showHandelr=async () =>{
     try {
      const res =await fetch(marketChart(id))
      const json= await res.json()
      setChart({...json,coins})
     } catch (error) {
      setChart(false)
     }
    }
    return(
     <tr >
        <td>
          <div className={styles.symbol} onClick={showHandelr}>
            <img src={image} alt="" />
            <span>{symbol.toUpperCase()}</span>
          </div>
        </td>
        <td>
          {name}
        </td>
        <td>$ {current_price.toLocaleString()}</td>

        <td className={price_change_percentage_24h>0 ?styles.success:styles.error}>{price_change_percentage_24h.toFixed(2)}%</td>

        <td>{total_volume.toLocaleString()}
      </td>

      <td>
        <img src={price_change_percentage_24h>0 ?chartUp:chartDoWn} 
        alt={name} />
      </td>
       </tr>
    )

}

