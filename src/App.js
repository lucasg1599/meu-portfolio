import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from './components/login/loginUser';

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/login" element={<Login/>} />
      </Routes>
    </Router>
  );
}

export default App;
