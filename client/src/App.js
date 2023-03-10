import { Routes, Route, BrowserRouter  } from "react-router-dom"; 
import RequireAuth from "./components/RequireAuth"
import Admin_Perfil from "./pages/Admin/Admin_Perfil";
import Dashboard from "./pages/Admin/Dashboard";
import Gerir_consumidores from "./pages/Admin/Gerir_consumidores";
import Gerir_fornecedores from "./pages/Admin/Gerir_fornecedores";
import Settings from "./pages/Admin/Settings";
import {Home, LoginTest, Cart, SignIn, SignUp, SupplierProfile, ConsumerProfile, NotFound, RegisterTest} from './pages/HomeView/index';
import { ShopContextProvider } from "./context/ShopContextProvider";
import './index.css';
import getClientType from "./hooks/getClientType";


function App() {  

  const userType = getClientType("/userType") 

  return (
    <ShopContextProvider>
      <BrowserRouter forceRefresh={true}>
        <Routes>
          {
            userType == "admin" && (
              <Route path="admin">
                <Route index element={<RequireAuth><Dashboard /></RequireAuth>} />
                <Route exact path="gerir_consumidores" element={<RequireAuth><Gerir_consumidores /></RequireAuth>} />
                <Route exact path="gerir_fornecedores" element={<RequireAuth><Gerir_fornecedores /></RequireAuth>} />
                <Route exact path="perfil" element={<RequireAuth><Admin_Perfil /></RequireAuth>} />
                <Route exact path="settings" element={<RequireAuth><Settings /></RequireAuth>} ></Route>
              </Route>
            )
          }

          {
            userType == "supplier" && (
              <Route path="/supplier" element={<RequireAuth><SupplierProfile /></RequireAuth>} />
            )
          }

          {
            userType == "consumer" && (
              <Route path="/consumer" element={<RequireAuth><ConsumerProfile /></RequireAuth>} />
            )
          }
          
          {/*----- Only for testing ----- */}
          <Route path="/login" element={<LoginTest />} />
          <Route path="/register" element={<RegisterTest />} />
          {/* ------------- */}
          
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<NotFound />} />

        </Routes>

      </BrowserRouter>
    </ShopContextProvider>

  );
}

export default App;