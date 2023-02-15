import { Routes, Route, BrowserRouter  } from "react-router-dom"; 

import Home from './pages/HomeView/Home';
import Dashboard from "./pages/Admin/Dashboard";
import Gerir_consumidores from "./pages/Admin/Gerir_consumidores";

import './index.css';

function App() {   

  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="admin">
            <Route index element={<Dashboard />} />
            <Route exact path="gerir_consumidores" element={<Gerir_consumidores />} />
          </Route> 
          
        </Routes>
    </BrowserRouter>
  );
}

export default App;
