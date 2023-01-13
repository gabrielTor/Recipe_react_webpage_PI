import { useState, useEffect } from 'react'
import styles from './pagination.module.css'
import { useDispatch, useSelector } from 'react-redux'

function Pagination({ numLength }){

    const [windowSize, setWindowSize] = useState(window.outerWidth)
    const page = useSelector(state => state.currentPage.num)
    const dispatch = useDispatch()
    const pageN = []
    for (let i = 1; i <= numLength; i++) {
        pageN.push(i)
    }
    const handleNext = () => {
        if(numLength !== page) dispatch({type: 'changePage', payload: page+1})
    }
    const handlePrev = () => {
        if(page !== 1) dispatch({type: 'changePage', payload: page-1})
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
            <li><button onClick={handlePrev}>&#10094;</button></li>
            {windowSize < 560 ? null : 
                pageN?.map(n => (
                    <li className={styles.btn} key={n}>
                        <button 
                            className={page === n ? styles.onPage : null} 
                            onClick={()=>dispatch({type: 'changePage', payload: n})}>
                                {n}
                        </button>
                    </li>))
            }
            <li><button onClick={handleNext}>&#10095;</button></li>
        </ul>
    )
}

export default Pagination;