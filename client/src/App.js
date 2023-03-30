import { Routes, Route, useLocation  } from "react-router-dom"; 
import RequireAuth from "./components/RequireAuth"
import Dashboard from "./pages/Admin/Dashboard";
import Admin_Perfil from "./pages/Admin/Admin_Perfil";
import Gerir_Consumidores from "./pages/Admin/Gerir_Consumidores";
import Gerir_Fornecedores from "./pages/Admin/Gerir_Fornecedores";
import Gerir_Adminstradores from "./pages/Admin/Gerir_Adminstradores";
import Gerir_Produtos from "./pages/Admin/Gerir_Produtos";
import Settings from "./pages/Admin/Settings";
import {Home, LoginTest, Cart, SignIn, SignUp, SupplierPage, SupplierProfile, ConsumerProfile, NotFound, RegisterTest, FAQ, CriarAnuncio, Category, ProductTest} from './pages/HomeView/index';
import { ShopContextProvider } from "./context/ShopContextProvider";
import getClientType from "./hooks/getClientType";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import Gerir_Transportes from "./pages/Admin/Gerir_Transportes";

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
                <Route exact path="gerir_consumidores" element={<RequireAuth><Gerir_Consumidores /></RequireAuth>} />
                <Route exact path="gerir_fornecedores" element={<RequireAuth><Gerir_Fornecedores /></RequireAuth>} />
                <Route exact path="gerir_transportes" element={<RequireAuth><Gerir_Transportes /></RequireAuth>} />
                <Route exact path="gerir_produtos" element={<RequireAuth><Gerir_Produtos /></RequireAuth>} />
                <Route exact path="settings" element={<RequireAuth><Settings /></RequireAuth>} ></Route>
              </Route>
            )
          }


          {userType == "supplier" &&
            (
              <Route path="supplier">
                <Route index element={ <RequireAuth><SupplierPage /></RequireAuth> }/>
                <Route exact path="profile" element={<RequireAuth><SupplierProfile /></RequireAuth>} />
              </Route>
            )
          }

          {userType == "consumer" && 
            (<Route path="/consumer" element={<RequireAuth><ConsumerProfile /></RequireAuth>} />)
          }   
          
          {/*----- Only for testing ----- */}
            <Route path="/loginTest" element={<LoginTest />} />
            <Route path="/productTest" element={<ProductTest />} />
            <Route path="/registerTest" element={<RegisterTest />} />
          {/* ------------- */}


          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/category" element={<Category />} />


          {/* para dps meter dentro do supplier */}
          <Route path="/anuncio" element={<CriarAnuncio />} />

          <Route path="/FAQ" element={<FAQ />} />
          
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<NotFound />} />

        </Routes>

      
    </ShopContextProvider>

  );
}

export default App;