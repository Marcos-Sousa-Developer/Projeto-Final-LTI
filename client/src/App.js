import { Routes, Route, BrowserRouter  } from "react-router-dom"; 

import Home from './pages/HomeView/Home';
import Dashboard from "./pages/Admin/Dashboard";

import './index.css';

function App() {   

  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<Dashboard />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
