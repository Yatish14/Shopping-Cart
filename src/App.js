import './App.css';
import Header from './components/Header';
import {BrowserRouter as Router, Route,Routes} from "react-router-dom";
import Home from './components/Home';
import Cart from './components/Cart';

function App() {
  return (
    <Router>
    <div className='App'>
          <Header />
          <Routes>
            <Route path ="/Shopping-Cart" element = {<Home />} exact></Route>
            <Route path ="/cart" element = {<Cart />}></Route>
          </Routes>
          
    </div>
    </Router>
  );
}

export default App;
