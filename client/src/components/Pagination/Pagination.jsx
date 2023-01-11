import styles from './pagination.module.css'

function Pagination({ page, setPage, nextP, prevP, numLength }){
    const pageN = []
    for (let i = 1; i <= numLength; i++) {
        pageN.push(i)
    }

    return(
        <ul className={styles.pNums}>
            <li><button onClick={()=>prevP()}>&#10094;</button></li>
            {
                pageN?.map(n => {
                return (
                    <li className={styles.btn} key={n}>
                        <button className={page === n ? styles.onPage : null} onClick={()=>setPage(n)}>{n}</button>
                    </li>)
                })
            }
            <li><button onClick={()=>nextP()}>&#10095;</button></li>
        </ul>
    )
}

export default Pagination;