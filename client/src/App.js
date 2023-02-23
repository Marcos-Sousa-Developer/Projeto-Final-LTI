import { Routes, Route, BrowserRouter  } from "react-router-dom"; 

import Dashboard from "./pages/Admin/Dashboard";
import Gerir_consumidores from "./pages/Admin/Gerir_consumidores";
import Gerir_fornecedores from "./pages/Admin/Gerir_fornecedores";

import {Home, Login, Cart, Profile, SignIn, SupplierProfile, SignUp, NotFound} from './pages/HomeView/index';
import {Navbar, Footer} from './components/index';
import './index.css';
import Admin_Perfil from "./pages/Admin/Admin_Perfil";

function App() {   

  return (
    <BrowserRouter forceRefresh={true}>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/supplier" element={<SupplierProfile />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="admin">
            <Route index element={<Dashboard />} />
            <Route exact path="gerir_consumidores" element={<Gerir_consumidores />} />
            <Route exact path="gerir_fornecedores" element={<Gerir_fornecedores />} />
            <Route exact path="perfil" element={<Admin_Perfil />} />
          </Route> 
            <Route path="*" element={<NotFound />} /> 
         </Routes>
    </BrowserRouter>
  );
}

export default App;