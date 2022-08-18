import './App.css';
import { Route } from 'react-router-dom'
import Home from './components/Home/Home';
import NavBar from './components/NavBar/Navbar';

function App() {

  return (
    <div className="App">
      {/* <Route path='/home' component={Home}></Route> */}
      <NavBar/>
    </div>
  );
}

export default App;
