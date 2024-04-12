import styles from './paginatio.module.css'

function Paginatio( {page,setPage}) {
    

    const previousHAndler= ()=>{
        if(page<=1){
            return;
        }
        setPage(page=>page-1)
    }
    const nexuHandler=()=>{
        if(page>=10){
            return
        }
        setPage(page=>page+1)
    }
  return (
    <div className={styles.Paginatio}>
        <button onClick={previousHAndler} className={page===1 ? styles.disabed:null }>Previous</button>
        
        <p className={page===1?styles.selected:null}>1</p>
        <p className={page===2?styles.selected:null}>2</p>
        <span>...</span>
        {page>2 &&page<9 &&(
            <>
            <p className={styles.selected}>{page}</p>
            </>
        )}
        <span>...</span>
        <p className={page===9?styles.selected:null}>9</p>
        <p className={page===10?styles.selected:null}>10</p>
        <button onClick={nexuHandler} className={page===10 ? styles.disabed:null }>Next</button>
    </div>
  )
}

export default Paginatio