import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import LandingPage from './Components/LandingPage';
import Home from './Components/Home';
import  Detail from "./Components/Detail";
import CreateDog from "./Components/CreateDog"


function App() {
  return (
    <BrowserRouter>
        <div className="App">
     <Switch>
       <Route exact path = "/" component = {LandingPage}/>
       <Route  exact path = '/home' component = {Home}/>
       <Route exact path = "/dogs/create" component = {CreateDog}/>
       <Route path = "/dogs/:id" component = {Detail}/>
     </Switch>
     </div>   
    </BrowserRouter>
  );
}

export default App;
