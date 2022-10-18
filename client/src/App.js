import './App.css';
import { Route } from 'react-router-dom'
import Home from './components/Home/Home'
import Create_Recipe from './components/CreateRecipe/Create_Recipe'
import Recipe_Details from './components/Details/Recipe_Details'
import LandingP from './components/LandingP/LandingP'
import EditRecipe from './components/Details/EditRecipe';

function App() {

  return (
    <div className="App">
      <Route exact path='/' component={LandingP}/>
      <Route exact path='/home' component={Home}/>
      <Route path='/createRecipe' component={Create_Recipe}/>
      <Route exact path='/home/:id' component={Recipe_Details}/>
      <Route exact path='/home/edit/:id' component={EditRecipe}/>
    </div>
  );
}

export default App;
