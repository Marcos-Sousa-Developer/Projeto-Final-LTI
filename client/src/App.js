import { Routes, Route, BrowserRouter  } from "react-router-dom"; 
import Admin_Perfil from "./pages/Admin/Admin_Perfil";
import Dashboard from "./pages/Admin/Dashboard";
import Gerir_consumidores from "./pages/Admin/Gerir_consumidores";
import Gerir_fornecedores from "./pages/Admin/Gerir_fornecedores";
import Settings from "./pages/Admin/Settings";
import {Home, Login, Cart, SignIn, SignUp, SupplierProfile, NotFound} from './pages/HomeView/index';
import './index.css';


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
            <Route exact path="settings" element={<Settings />} ></Route>
          </Route> 
            <Route path="*" element={<NotFound />} /> 
         </Routes>
    </BrowserRouter>
  );
}

export default App;