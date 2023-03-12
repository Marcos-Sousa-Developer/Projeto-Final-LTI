import React, {useEffect, useState } from 'react'
import Aside from "./components/Aside";
import Head from "./components/Head";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Link } from "react-router-dom";
import getAllFromDB from '../../hooks/getAllFromDB';
import SearchBar from './components/ProfilesComponents/SearchBar';

// user can be consumer, supplier or admin
function Gerir_Produtos() { 

  const products = getAllFromDB('/products');
  
  const [from, setFrom] = useState(0);

  const [to, setTo] = useState(12);

  const [currentStep, setCurrentStep] = useState(1);

  const [navigationArray, setNavigationArray] = useState([]);

  const [minNavigation, setMinNavigation] = useState(0);

  const [maxNavigation, setMaxNavigation] = useState(5);

  const increment = (newCurrentStep) => {
    if ((newCurrentStep) => 1 && newCurrentStep <= Math.ceil(products.length / 12)) {
      setFrom(newCurrentStep * 12 - 12);
      setTo(newCurrentStep * 12);
      setCurrentStep(newCurrentStep);

      if (newCurrentStep == navigationArray[navigationArray.length - 1] && newCurrentStep !== Math.ceil(products.length / 12)) {
        setMinNavigation(newCurrentStep - 3);
        setMaxNavigation(maxNavigation + 2);

      } else if (newCurrentStep == navigationArray[0] && newCurrentStep !== 1) {
        let newMinNavigation = newCurrentStep - 3;

        if(newCurrentStep <= 5){
          newMinNavigation = 0
        }
       /* if (newCurrentStep == 5) {
          setMinNavigation((newMinNavigation += 1));
        }*/

        setMinNavigation(newMinNavigation);
        setMaxNavigation(maxNavigation - 2);
      }
    }
  };

  useEffect(() => {
    let array = [];
    let max = maxNavigation
    if(max > Math.ceil(products.length/12)) {
      max = Math.ceil(products.length/12)
    }
    for (let i = minNavigation; i < max; i++) {
      array.push(i + 1);
    }
    setNavigationArray(array);
  }, [products,minNavigation]);
    
    return (
      <div>
        <HelmetProvider>
          <Helmet>
            <title>Admin-Gerir Administradores</title>
          </Helmet>
        </HelmetProvider>
        <Head></Head>
        <Header></Header>
        <Aside></Aside>

        <main id="main" className="main">
          <div className="pagetitle">
            <h1>Gerir Produtos</h1>
            <nav>
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/admin" >
                    Home
                  </Link>
                </li>
                <li className="breadcrumb-item active">Gerir Produtos</li>
              </ol>
            </nav>
          </div>
          <section className="section dashboard">
            <div className="col-xl-12">
              <div className="row ">
                <h5 className="card-title">
                  <i className="bi bi-cart"></i> Produtos
                  <SearchBar></SearchBar>
                </h5>

                {products.slice(from, to).map((product) => (
                  <div className="col-xxl-3">
                    <div className="card" style={{ textAlign: "center" }}>
                      <br></br>
                      <img
                        className="card-img-top rounded mx-auto d-block"
                        src="https://i.pinimg.com/originals/b3/f1/da/b3f1da70927cc796e51f5a9066dde860.png"
                        alt="Card image cap"
                        style={{ width: "45%" }}
                      ></img>
                      <div className="card-body">
                        <h5 className="card-title">EAN: {product.EAN}</h5>
                        <p className="card-text">Data de Produção: {product.data_producao}</p>
                        <a href="#" className="btn btn-primary">
                          Ver Detalhes
                        </a>
                        {/*<i className="bi bi-trash3" style={{float:"right", fontSize:"1.5rem"}}></i>*/}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ textAlign: "center" }}>
              <nav className="navigationBar">
                <ul className="pagination justify-content-center">
                  <li className="page-item">
                    {currentStep !== 1 && (
                      <button
                        onClick={() => increment(currentStep - 1)}
                        className="page-link"
                        aria-label="Previous"
                      >
                        <i className="bi bi-arrow-left"></i>
                      </button>
                    )}
                  </li>
                  {navigationArray.map((index) =>
                    index == currentStep ? (
                      <li key={index} className="page-item active">
                        <button
                          onClick={() => increment(index)}
                          className="page-link"
                        >
                          {index}
                        </button>
                      </li>
                    ) : (
                      <li key={index} className="page-item">
                        <button
                          onClick={() => increment(index)}
                          className="page-link"
                        >
                          {index}
                        </button>
                      </li>
                    )
                  )}
                  <li className="page-item">
                    {currentStep !== Math.ceil(products.length / 12) && (
                      <button
                        onClick={() => increment(currentStep + 1)}
                        className="page-link"
                        aria-label="Next"
                      >
                        <i className="bi bi-arrow-right"></i>
                      </button>
                    )}
                  </li>
                </ul>
              </nav>
            </div>
          </section>
        </main>
        <Footer></Footer>
      </div>
    );
}


export default Gerir_Produtos