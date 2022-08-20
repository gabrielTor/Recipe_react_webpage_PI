import './App.css';
import { Route } from 'react-router-dom'
import Home from './components/Home/Home'
import Create_Recipe from './components/CreateRecipe/Create_Recipe'
import Recipe_Details from './components/Details/Recipe_Details'
import LandingP from './components/LandingP/LandingP'


function App() {

  return (
    <div className="App">
      <Route exact path='/' component={LandingP}/>
      <Route path='/home' component={Home}/>
      <Route path='/createRecipe' component={Create_Recipe}/>
      <Route path='/home:id' component={Recipe_Details}/>
    </div>
  );
}

export default App;
