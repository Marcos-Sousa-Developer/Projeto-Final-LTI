import { Routes, Route, BrowserRouter  } from "react-router-dom"; 

import Dashboard from "./pages/Admin/Dashboard";

import {Home, Login, Cart, Profile} from './pages/HomeView/index';
import './index.css';

function App() {   

  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/cart" element={<Cart />} />
          
          <Route path="/admin" element={<Dashboard />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
