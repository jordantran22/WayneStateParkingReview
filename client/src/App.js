import logo from './logo.svg';
import './App.css';
import HomePage from './components/HomePage';
import { Route, Link } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      {/* <Route exact path="/components/HomePage.js" component={<HomePage />} /> */}
      {/* // <HomePage/> */}
      <HomePage />
    </div>
  );
}

export default App;
