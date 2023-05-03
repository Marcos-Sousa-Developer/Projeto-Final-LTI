import { Routes, Route, useLocation} from "react-router-dom";
import RequireAuth from "./components/RequireAuth"
import Dashboard from "./pages/Admin/Dashboard";
import Admin_Perfil from "./pages/Admin/Admin_Perfil";
import Gerir_Consumidores from "./pages/Admin/Gerir_Consumidores";
import Gerir_Fornecedores from "./pages/Admin/Gerir_Fornecedores";
import Gerir_Adminstradores from "./pages/Admin/Gerir_Adminstradores";
import Gerir_Produtos from "./pages/Admin/Gerir_Produtos";
import Gerir_Encomendas from "./pages/Admin/Gerir_Encomendas";
import Gerir_Transportes from "./pages/Admin/Gerir_Transportes";
import Gerir_Anuncio from "./pages/Admin/Gerir_Anuncio";
import Settings from "./pages/Admin/Settings";
import {Home, Cart, SignIn, SignUp, SupplierPage, SupplierProfile, ConsumerProfile, NotFound, FAQ, CriarAnuncio, Anunciar, Category, ProductTest, ConsumerTest, SupplierTest, ProductPage, SupplierAdd, SupplierProdUnit, CompareProduct, SupplierSell, ConsumerOrdersHistory, Search, SupplierOrdersHistory, MarketPlace} from './pages/HomeView/index';
import getClientType from "./hooks/getClientType";
import { useEffect, useState } from "react";
import Relatorios_Consumidores from "./pages/Admin/Relatorios_Consumidores";
import Relatorios_Fornecedores from "./pages/Admin/Relatorios_Fornecedores";
import Relatorios_Encomendas from "./pages/Admin/Relatorios_Encomendas";
import LoadingPage from "./pages/LoadingPage";
import Checkout from "./pages/HomeView/Checkout/Checkout";
import { useCookies } from "react-cookie";


function App() {

  const [userType, setUserType] = useState(false)
  const [loading, setLoading] = useState(false)
  const location = useLocation(); 
  const [cookies,setCookies] = useCookies()

  const getUserType = async () => {

    setLoading(true)

    let response = await getClientType()   

    if(response) {

      let type = response[0]
      let name = response[1]

      setUserType(type)
      setCookies('identification',name,{ path: '/' })

    }
    
    setLoading(false)
  }

  useEffect(() => {
    getUserType()
  },[location, cookies.identification])

  return (
    <>
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
                <Route exact path="gerir/anuncio" element={<RequireAuth><Gerir_Anuncio /></RequireAuth>} />
                <Route exact path="gerir/encomendas" element={<RequireAuth><Gerir_Encomendas /></RequireAuth>} />
                <Route exact path="gerir/transportes" element={<RequireAuth><Gerir_Transportes /></RequireAuth>} />
                <Route exact path="relatorios/consumidores" element={<RequireAuth><Relatorios_Consumidores /></RequireAuth>} />
                <Route exact path="relatorios/fornecedores" element={<RequireAuth><Relatorios_Fornecedores /></RequireAuth>} />
                <Route exact path="relatorios/encomendas" element={<RequireAuth><Relatorios_Encomendas /></RequireAuth>} />
                <Route exact path="settings" element={<RequireAuth><Settings /></RequireAuth>} ></Route>
              </Route>
            )
          }

          {userType == "supplier" &&
            (
              <Route path="supplier">
                <Route index element={ <RequireAuth><SupplierPage /></RequireAuth>}/>
                <Route exact path="Add" element={<RequireAuth><SupplierAdd /></RequireAuth>} />
                <Route exact path="Sell" element={<RequireAuth><SupplierSell /></RequireAuth>} />
                <Route exact path="produnit" element={<RequireAuth><SupplierProdUnit/></RequireAuth>} />
                <Route exact path="profile" element={<RequireAuth><SupplierProfile /></RequireAuth>} />
              </Route>
            )
          }

          {userType == "consumer" && 
            (
              <Route path="consumer">                
                <Route exact path="ordersHistory" element={<RequireAuth><ConsumerOrdersHistory/></RequireAuth>} />                
                <Route exact path="profile" element={<RequireAuth><ConsumerProfile/></RequireAuth>} />
              </Route>
            )
          }   
          
          {/*----- Only for testing ----- */}
            <Route path="/productTest" element={<ProductTest />} />
            <Route path="/consumerTest" element={<ConsumerTest />} />
            <Route path="/supplierTest" element={<SupplierTest />} />
          {/* ---------------------------- */}

          {/* para dps meter dentro do supplier */}
          <Route path="/anuncio" element={<CriarAnuncio />} />
          <Route path="/anunciar" element={<Anunciar />} />
          <Route path="/SupplierOrdersHistory" element={<SupplierOrdersHistory />} />
          {/* --------------------------------- */}

          {/*---------for not logged in users--------*/}
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/pesquisa" element={<Search />} />
          <Route path="/categoria" element={<Category />} />
          <Route path="/produto" element={<ProductPage/>} />
          <Route path="/market-place" element={<MarketPlace/>} />
          <Route path="/comparador" element={<CompareProduct></CompareProduct>}/>
          <Route path="/FAQ" element={<FAQ />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="*" element={<NotFound />} />
          {/* ------------------------------------- */}
        </Routes>
        )
        : 
        <LoadingPage></LoadingPage>
      }
    </>
  );
}

export default App;