import { Routes, Route, useLocation  } from "react-router-dom"; 
import RequireAuth from "./components/RequireAuth"
import Dashboard from "./pages/Admin/Dashboard";
import Admin_Perfil from "./pages/Admin/Admin_Perfil";
import Gerir_consumidores from "./pages/Admin/Gerir_consumidores";
import Gerir_fornecedores from "./pages/Admin/Gerir_fornecedores";
import Gerir_Adminstradores from "./pages/Admin/Gerir_Adminstradores";
import Gerir_Produtos from "./pages/Admin/Gerir_Produtos";
import Settings from "./pages/Admin/Settings";
import {Home, LoginTest, Cart, SignIn, SignUp, SupplierProfile, ConsumerProfile, NotFound, RegisterTest} from './pages/HomeView/index';
import { ShopContextProvider } from "./context/ShopContextProvider";
import './index.css';
import getClientType from "./hooks/getClientType";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

function App() {

  const [userType, setUserType] = useState(false) 
  const [cookies] = useCookies(['userSession']);
  const location = useLocation();

  const getUserType = async () => {
    if(cookies.userSession){
      let type = await getClientType('/userType')
      setUserType(type)
    }    
  }

  useEffect(() => {
    getUserType()
  },[location])

  return (
    <ShopContextProvider>
      
        <Routes>
          {userType == "admin" &&
            (
              <Route path="admin">
                <Route index element={ <RequireAuth><Dashboard /></RequireAuth> }/>
                <Route exact path="perfil" element={<RequireAuth><Admin_Perfil /></RequireAuth>} />
                <Route exact path="gerir_adminstradores" element={<RequireAuth><Gerir_Adminstradores /></RequireAuth>} />
                <Route exact path="gerir_consumidores" element={<RequireAuth><Gerir_consumidores /></RequireAuth>} />
                <Route exact path="gerir_fornecedores" element={<RequireAuth><Gerir_fornecedores /></RequireAuth>} />
                <Route exact path="gerir_produtos" element={<RequireAuth><Gerir_Produtos /></RequireAuth>} />
                <Route exact path="settings" element={<RequireAuth><Settings /></RequireAuth>} ></Route>
              </Route>
            )
          }

          {userType == "supplier" && 
            (<Route path="/supplier" element={<RequireAuth><SupplierProfile /></RequireAuth>} />)
          }

          {userType == "consumer" && 
            (<Route path="/consumer" element={<RequireAuth><ConsumerProfile /></RequireAuth>} />)
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

      
    </ShopContextProvider>

  );
}

export default App;