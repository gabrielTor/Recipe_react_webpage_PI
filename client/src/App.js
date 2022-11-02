import './App.css';
import { Redirect, Route } from 'react-router-dom'
import Home from './components/Home/Home'
import CreateRecipe from './components/CreateRecipe/Create_Recipe'
import RecipeDetails from './components/Details/Recipe_Details'
import LandingP from './components/LandingP/LandingP'
import EditRecipe from './components/Details/EditRecipe';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import { useSelector } from 'react-redux'

function App() {

  const user = useSelector(state => state.user)

  return (
    <div className="App">
      <Route exact path='/' component={LandingP}/>
      <Route exact path='/home' component={Home}/>
      <Route path='/createRecipe' render={() => user.user ? <CreateRecipe /> : <Redirect to='/login'/>}/>
      <Route exact path='/home/:id' component={RecipeDetails}/>
      <Route exact path='/home/edit/:id' component={EditRecipe}/>
      <Route path='/register' component={Register}/>
      <Route path='/login' component={Login}/>
    </div>
  );
}

export default App;
