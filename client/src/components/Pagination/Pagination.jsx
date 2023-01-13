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
        <div className={styles.pNums}>
            <button onClick={handlePrev}>&#10094;</button>
            {windowSize < 560 ? null : 
                pageN?.map(n => (
                    <span className={styles.btn} key={n}>
                        <button 
                            className={page === n ? styles.onPage : null} 
                            onClick={()=>dispatch({type: 'changePage', payload: n})}>
                                {n}
                        </button>
                    </span>))
            }
            <button onClick={handleNext}>&#10095;</button>
        </div>
    )
}

export default Pagination;