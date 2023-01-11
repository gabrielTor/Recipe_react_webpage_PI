import { useState, useEffect } from 'react'
import styles from './pagination.module.css'

function Pagination({ page, setPage, nextP, prevP, numLength }){

    const [windowSize, setWindowSize] = useState(window.outerWidth)
    const pageN = []
    for (let i = 1; i <= numLength; i++) {
        pageN.push(i)
    }

    useEffect(() => {
        const handleWindowResize = () => {
          setWindowSize(window.outerWidth)
        };
    
        window.addEventListener('resize', handleWindowResize)
    
        return () => {
          window.removeEventListener('resize', handleWindowResize)
        }
    })

    return(
        <ul className={styles.pNums}>
            <li><button onClick={()=>prevP()}>&#10094;</button></li>
            {windowSize < 560 ? null : 
                pageN?.map(n => (
                    <li className={styles.btn} key={n}>
                        <button className={page === n ? styles.onPage : null} onClick={()=>setPage(n)}>{n}</button>
                    </li>))
            }
            <li><button onClick={()=>nextP()}>&#10095;</button></li>
        </ul>
    )
}

export default Pagination;