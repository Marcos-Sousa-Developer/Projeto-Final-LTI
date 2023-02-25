import React, {useState} from 'react'
import {Helmet, HelmetProvider} from 'react-helmet-async'; 
import Aside from "./components/Aside";
import Footer from "./components/Footer";
import Head from "./components/Head";
import Header from "./components/Header";
import DeleteAccountModal from './components/Modals/DeleteAccountModal';

function Settings() {

    const [isread_Only, setRead_Only] = useState(true);
    const [isform_disable, setForm_disable] = useState(true); 

    const [isModalDelete, setModalDelete] = useState(false)


    const activeOrDeactivateForm = () => {
        isread_Only ? setRead_Only(false) : setRead_Only(true);
        isform_disable ? setForm_disable(false) : setForm_disable(true);
    }

    const deleteAccountModal = () => {
        isModalDelete ? setModalDelete(false) : setModalDelete(true)
    }




  return (
    <div>
      <HelmetProvider>
        <Helmet>
          <title>Admin - Definições</title>
        </Helmet>
      </HelmetProvider>
      <Head></Head>
      <Header></Header>
      <Aside></Aside> 
      <main id="main" className="main">

        <div className="pagetitle">
          <h1><i className="bi bi-gear-fill"></i> Definições</h1>
        </div>

        <section className="section dashboard">
            <div className="col-lg-12">
                <div className="row">
                    <div className="col-xxl-12">
                    <br></br>
                        <div className="card">
                            <br></br>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-sm-6">
                                        <div className="card-body">
                                            <h5 className="card-title">Definições de Conta</h5>
                                            <label htmlFor="username"><strong>Nome de Utilizador</strong></label>
                                            <input
                                                className="form-control"
                                                id="username"
                                                placeholder="anderson@admin.com"
                                                disabled={isform_disable}
                                                readOnly={isread_Only}
                                            ></input>
                                            <br></br>
                                            <label htmlFor="password"><strong>Palavra Passe</strong></label>
                                            <input
                                                className="form-control"
                                                id="password"
                                                placeholder="*********"
                                                disabled={isform_disable}
                                                readOnly={isread_Only}
                                            ></input>
                                            <br></br>
                                            {
                                                isread_Only ? 
                                                (
                                                <button className="btn btn-warning" onClick={() => activeOrDeactivateForm()}>
                                                Editar
                                                </button>
                                                ) : 
                                                (
                                                <div>
                                                    <button className="btn btn-secondary" onClick={() => activeOrDeactivateForm()}>
                                                    Cancelar
                                                    </button>&nbsp;&nbsp;&nbsp;
                                                    <button className="btn btn-success">
                                                    Alterar
                                                    </button>
                                                </div>
                                                )
                                            }
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <br></br>
                                        <div className="card">
                                            <div className="card-body">
                                                <h5 className="card-title">Requesitos da palavra Passe</h5>
                                                <p className="card-text">1. Pelo menos 8 caracteres</p>
                                                <p className="card-text">2. Pelo menos 1 letra maiscula</p>
                                                <p className="card-text">3. Pelo menos 1 número</p>
                                                <p className="card-text">4. Pelo menos 1 caractér especial</p>
                                            </div>
                                        </div>
                                    </div> 
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">Apagar Conta</h5>
                                    <p className="card-text">Apagar a tua conta é um ato permanente e não pode ser revertido.</p>
                                    <button type="button" className="btn btn-danger" onClick={() => deleteAccountModal()}>Apagar conta</button>
                                </div>
                            </div>
                        </div>
                        {
                            isModalDelete && (<DeleteAccountModal isShowingModal={deleteAccountModal}></DeleteAccountModal>)
                        }
                    </div> 
                </div>
            </div>
        </section>
      </main>
      <Footer></Footer>
    </div>
  )
}

export default Settings
