import './App.css';
import HomePage from './components/HomePage';
import StructureDetailsPage from './components/StructureDetailsPage';
import MyReviewsPage from './components/MyReviewsPage';
import { render } from "react-dom";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import NavBar from './components/NavBar';

function App() {
  return (
    render(
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/StructureDetailsPage" element={<StructureDetailsPage />}></Route>
          <Route path="/MyReviewsPage" element={<MyReviewsPage />}></Route>
        </Routes>
      </BrowserRouter>,
      document.getElementById("root")
    )
  );
}

export default App;
