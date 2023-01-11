import styles from './recipe.module.css'
import { Link } from 'react-router-dom'

function Recipe(props) {
  
  return (
    <Link to={`/home/${props.id}`}>
      <div className={styles.card}>
        <h3>{props.name}</h3>
        <img className={styles.recipeImg} src={props.image} alt="recipe"/>
        <p><b>Diet Type:</b> {props.diets?.map((d, k) => (<span key={k}> - {d.name}</span>))}</p>
      </div>
    </Link>
  )
}
  
export default Recipe;