import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import './index.css'
import Navbar from './components/Navbar';
import Details from './views/Details';
import Home from './views/Home';
import News from './views/News';
import Swap from './views/Swap';


function App() {

  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/details/:id">
          <Details/>
        </Route>
        <Route path="/news/:id?">
          <News/>
        </Route>
        <Route path="/swap">
          <Swap/>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
