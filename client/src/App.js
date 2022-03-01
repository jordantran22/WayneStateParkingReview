import logo from './logo.svg';
import './App.css';
import HomePage from './components/HomePage';
import ParkingStructurePage from './components/ParkingStructurePage';
import { render } from "react-dom";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  return (

    render(
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/ParkingStructurePage" element={<ParkingStructurePage />}></Route>
        </Routes>
      </BrowserRouter>,
      document.getElementById("root")
    )
      // <div className="App">
      //   <HomePage />
      // </div>
  );
}

export default App;
