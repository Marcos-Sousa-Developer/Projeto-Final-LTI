import React, { useEffect, useState } from "react";
import Aside from "./components/Aside";
import Head from "./components/Head";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Helmet, HelmetProvider } from "react-helmet-async";
import getConsumers from "../../hooks/getConsumers";
import Navigator from "./components/Navigator";

function Gerir_consumidores() { 

  const users = getConsumers("/api/consumers")

  const [first, setFirst] = useState(0);

  const [second, setSecond] = useState(10); 

  const [current, setCurrent] = useState(1);

  const [navArray, setNavArray] = useState([])

  const [navigation, setNavigation] = useState(0);

  const [maxNavigation, setMaxNavigation] = useState(10);

  const increment = (currentTab) => {   

    if(currentTab <= users.length/10 && currentTab >= 1 && currentTab != current) {
      setFirst(currentTab * 10 - 10);
      setSecond(currentTab * 10); 
      setCurrent(currentTab)
      
      if((currentTab > current) && (currentTab % 10 == 0 || (currentTab % 5 == 0)) && currentTab > 5){
        
        if(users.length/10 == currentTab) {
          setNavigation(currentTab-11)
          setMaxNavigation(currentTab)
        }
        else{
          setNavigation(currentTab-6)
          setMaxNavigation(maxNavigation + 5)
        }
        
      }
      else if((currentTab < current) && currentTab % 5 == 0) {
        if(currentTab == 5) {
          setNavigation(0)
        }
        else {
          setNavigation(currentTab -6)
        }
        console.log(maxNavigation)
        console.log(currentTab)
        setMaxNavigation(maxNavigation-5)
      } 
    }
  };

  useEffect(() => {
    let array = []
    for(let i=navigation; i< maxNavigation; i++) {
      array.push(i+1)
    }
    setNavArray(array)
  },[navigation])

  return (
    <div>
      <HelmetProvider>
        <Helmet>
          <title>Admin - Gerir Consumidores</title>
        </Helmet>
      </HelmetProvider>
      <Head></Head>
      <Header></Header>
      <Aside></Aside>

      <main id="main" className="main">
        <div className="pagetitle">
          <h1>Gerir Consumidores</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="index.html">Home</a>
              </li>
              <li className="breadcrumb-item active">Gerir Consumidores</li>
            </ol>
          </nav>
        </div>
        <section className="section dashboard">
          <div className="col-lg-12">
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">Consumidores</h5>
                    <table className="table">
                      <thead>
                        <tr>
                          <th scope="col">ID</th>
                          <th scope="col">Nome</th>
                          <th scope="col">Email</th>
                        </tr>
                      </thead>
                      <tbody>
                        {users.slice(first, second).map((user) => (
                          <tr key={user.id}>
                            <th scope="row">{user.id}</th>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <Navigator navArray={navArray} currentTab={current} handleClick={{"function" : increment}}></Navigator>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer></Footer>
    </div>
  );
}

export default React.memo(Gerir_consumidores);
