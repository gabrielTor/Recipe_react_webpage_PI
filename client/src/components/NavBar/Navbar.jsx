import styles from './navbar.module.css'
import { Link } from 'react-router-dom'
import Search from '../Search/Search'
import Filter from '../Filter/Filter'
import { useSelector } from 'react-redux'
/* eslint-disable */
function Navbar() {

  const user = useSelector(state => state.user)

  return (
    <nav className={styles.nav}>
      <Link to='/home'>HOME</Link>
      <Link to='/createRecipe'>Create Recipe</Link>
      <Link to='/login'>{user.user ? 'Logout' : 'Login'}</Link>
      {user.user && window.location.href === 'https://recipe-react-webpage-pi.vercel.app/home' ?
      <Link to='/home'>{user.user.toUpperCase()}</Link>
      : null}
      <Filter/>  
      <Search/>
    </nav>
  );
}
  
export default Navbar;