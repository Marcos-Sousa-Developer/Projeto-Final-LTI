import { Routes, Route, useLocation} from "react-router-dom";
import RequireAuth from "./components/RequireAuth"
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
import SubCategory from "./pages/HomeView/SubCategory/SubCategory";
import SubSubCategory from "./pages/HomeView/SubSubCategory/SubSubCategory";


function App() {

  const [userType, setUserType] = useState(false)
  const [loading, setLoading] = useState(false)
  const location = useLocation(); 
  const [cookies,setCookies] = useCookies()

  const getUserType = async () => {

    setLoading(true)

    let response = await getClientType()   

    if(response != false) {

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
                <Route index element={ <RequireAuth><SupplierPage/></RequireAuth>}/>
                <Route exact path="profile" element={<RequireAuth><SupplierProfile/></RequireAuth>} />
                <Route exact path="anuncio" element={<RequireAuth><CriarAnuncio/></RequireAuth>} />
                <Route exact path="anunciar" element={<RequireAuth><Anunciar/></RequireAuth>} />
                <Route exact path="add" element={<RequireAuth><SupplierAdd/></RequireAuth>} />
                <Route exact path="sell" element={<RequireAuth><SupplierSell/></RequireAuth>} />
                <Route exact path="encomendas" element={<RequireAuth><SupplierOrdersHistory/></RequireAuth>} />
                <Route exact path="produnit" element={<RequireAuth><SupplierProdUnit/></RequireAuth>} />
              </Route>
            )
          }

          {userType == "consumer" && 
            (
              <Route path="consumer">                
                <Route exact path="encomendas" element={<RequireAuth><ConsumerOrdersHistory/></RequireAuth>} />                
                <Route exact path="profile" element={<RequireAuth><ConsumerProfile/></RequireAuth>} />
              </Route>
            )
          }   

          { (userType != "supplier"  && userType != "admin") &&
            (     
              <>           
                <Route path="/" element={<Home/>} />
                <Route path="/pesquisa" element={<Search/>} />
                <Route path="/categoria" element={<Category/>} />
                <Route path="/subcategoria" element={<SubCategory/>} />
                <Route path="/subsubcategoria" element={<SubSubCategory/>} />
                <Route path="/produto" element={<ProductPage/>} />
                <Route path="/market-place" element={<MarketPlace/>} />
                <Route path="/comparador" element={<CompareProduct></CompareProduct>}/>
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
              </>
            )
          }
          
          {/*----- Only for testing ----- */}
            <Route path="/productTest" element={<ProductTest />} />
            <Route path="/consumerTest" element={<ConsumerTest />} />
            <Route path="/supplierTest" element={<SupplierTest />} />
          {/* ---------------------------- */}

          {/*---------for not logged in users--------*/}
          <Route path="/signin" element={<SignIn/>} />
          <Route path="/signup" element={<SignUp/>} />
          <Route path="/FAQ" element={<FAQ />} />
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