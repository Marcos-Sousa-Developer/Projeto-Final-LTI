import { Routes, Route, useLocation  } from "react-router-dom"; 
import RequireAuth from "./components/RequireAuth"
import Dashboard from "./pages/Admin/Dashboard";
import Admin_Perfil from "./pages/Admin/Admin_Perfil";
import Gerir_Consumidores from "./pages/Admin/Gerir_Consumidores";
import Gerir_Fornecedores from "./pages/Admin/Gerir_Fornecedores";
import Gerir_Adminstradores from "./pages/Admin/Gerir_Adminstradores";
import Gerir_Produtos from "./pages/Admin/Gerir_Produtos";
import Settings from "./pages/Admin/Settings";
import {Home, LoginTest, Cart, SignIn, SignUp, SupplierPage, SupplierProfile, ConsumerProfile, NotFound, RegisterTest, FAQ, CriarAnuncio, Anunciar, Category, ProductTest, ConsumerTest, SupplierTest} from './pages/HomeView/index';
import { ShopContextProvider } from "./context/ShopContextProvider";
import getClientType from "./hooks/getClientType";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import Gerir_Transportes from "./pages/Admin/Gerir_Transportes";
import Relatorios_Consumidores from "./pages/Admin/Relatorios_Consumidores";
import Relatorios_Encomendas from "./pages/Admin/Relatorios_Encomendas";
import LoadingPage from "./pages/LoadingPage";

function App() {

  const [userType, setUserType] = useState(false)
  const [loading, setLoading] = useState(false)
  const [cookies] = useCookies(['userSession']);
  const location = useLocation();

  const getUserType = async () => {
    setLoading(true)
    if(cookies.userSession){
      let type = await getClientType('/userType')
      setUserType(type)
    }
    setLoading(false)
  }

  useEffect(() => {
    getUserType()
  },[location])

  return (
    <ShopContextProvider>

      {

        !loading ? (
      
        <Routes>
          {userType == "admin" &&
            (
              <Route path="admin">
                <Route index element={ <RequireAuth><Dashboard /></RequireAuth> }/>
                <Route exact path="perfil" element={<RequireAuth><Admin_Perfil /></RequireAuth>} />
                <Route exact path="gerir/adminstradores" element={<RequireAuth><Gerir_Adminstradores /></RequireAuth>} />
                <Route exact path="gerir/consumidores" element={<RequireAuth><Gerir_Consumidores /></RequireAuth>} />
                <Route exact path="gerir/fornecedores" element={<RequireAuth><Gerir_Fornecedores /></RequireAuth>} />
                <Route exact path="gerir/produtos" element={<RequireAuth><Gerir_Produtos /></RequireAuth>} />
                <Route exact path="gerir/transportes" element={<RequireAuth><Gerir_Transportes /></RequireAuth>} />
                <Route exact path="relatorios/cosumidores" element={<RequireAuth><Relatorios_Consumidores /></RequireAuth>} />
                <Route exact path="relatorios/encomendas" element={<RequireAuth><Relatorios_Encomendas /></RequireAuth>} />
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
            <Route path="/consumerTest" element={<ConsumerTest />} />
            <Route path="/supplierTest" element={<SupplierTest />} />
          {/* ------------- */}


          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/category" element={<Category />} />


          {/* para dps meter dentro do supplier */}
          <Route path="/anuncio" element={<CriarAnuncio />} />
          <Route path="/anunciar" element={<Anunciar />} />
          {/* --------------------------------- */}
          

          <Route path="/FAQ" element={<FAQ />} />
          
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<NotFound />} />

        </Routes>
        )

        : 

        <LoadingPage></LoadingPage>

  }

      
    </ShopContextProvider>

  );
}

export default App;