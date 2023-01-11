import styles from './recipe.module.css'
import { Link } from 'react-router-dom'

function Recipe(props) {
  
  return (
    <div className={styles.card}>
        <Link to={`/home/${props.id}`}>
          <h3>{props.name}</h3>
          <img className={styles.recipeImg} src={props.image} alt="recipe"/>
          <p><b>Diet Type:</b> {props.diets?.map((d, k) => (<span key={k}> - {d.name}</span>))}</p>
      </Link>
    </div>
  )
}
  
export default Recipe;