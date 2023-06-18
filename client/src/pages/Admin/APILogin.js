import React, { useState } from "react";
import Head from "./components/Head";
import { Helmet, HelmetProvider } from "react-helmet-async";
import {authentication} from "../../authentication" 
import LoadingPage from "../LoadingPage";

function TransportadoraIndex() {  

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [result, setResult] = useState("")
    const [authorization, setAuth] = useState("")
    const [client_id, setClient] = useState("")
    const [token_id, setToken] = useState("")


    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)

    const getAPITokens = async () => {
        if(email=== "" || password === "") {
            setError(false)
        }
        else {
                    
        try {
            setLoading(true)
            let result = await authentication.getAPICredentials(email,password)
            if(result === false) {
                setError(true)
                setResult("")
            }
            else {
                setAuth(result.getAccessToken().getJwtToken())
                setClient(result.getIdToken().payload['aud'])
                setToken(result.getIdToken().getJwtToken())
                setResult(JSON.stringify(result))
            }
        }
        catch {
            setError(true)
        }
        
        }
        setLoading(false)

    }

  return (
    <div>
      <HelmetProvider>
        <Helmet>
          <title>API Get Credentials</title>
        </Helmet>
      </HelmetProvider>
      <Head></Head>

      <main className="main" style={{padding:"60px"}}>

        <div className="pagetitle d-flex justify-content-center d-flex justify-content-center align-items-center">
          <h1> API Get Credentials </h1>
        </div>
      <br></br>
        <section className="section dashboard">

          <div className="col-lg-12">

            <div className="row justify-content-center d-flex align-items-center center">
              <div className="col-xxl-4 mb-4 ">
                <label className="justify-content-center">Email</label>
                <input type="email" className="form-control" onChange={(e) => setEmail(e.target.value)}></input>
              </div>
            </div>

            <div className="row justify-content-center d-flex align-items-center center">
              <div className="col-xxl-4 mb-4 ">
                <label className="justify-content-center">Password</label>
                <input type="password" className="form-control" onChange={(e) => setPassword(e.target.value)}></input>
              </div>
            </div>

            <div className="row justify-content-center d-flex align-items-center">
              <div className="col-xxl-4 mb-4 ">
              {
                loading ? 
                (
                    <LoadingPage></LoadingPage>
                )
                :
                (
                <button className="btn btn-primary" onClick={() => getAPITokens()}>
                    Get Credentials
                </button>
                )
              }

              </div>
            </div>
             
             {
                (error && !loading) ? 
                (
                    <div className="justify-content-center d-flex align-items-center center">
                        Not possible get data
                    </div>
                )
                :
                (result != "" && !loading) ?
                (
                    <div className="row justify-content-center d-flex align-items-center center">
                        <div className="col-xxl-12 mb-12" style={{paddingBottom: "15px", wordWrap:"break-word"}}>
                            <label style={{color: "green"}} className="justify-content-center">Authorization</label>
                            <p>{authorization}</p>
                        </div>
                        <div className="col-xxl-12 mb-12" style={{paddingBottom: "15px", wordWrap:"break-word"}}>
                            <label style={{color: "green"}} className="justify-content-center">Client-id</label>
                            <p>{client_id}</p>
                        </div>
                        <div className="col-xxl-12 mb-12" style={{paddingBottom: "15px", wordWrap:"break-word"}}>
                            <label style={{color: "green"}} className="justify-content-center">Token-id</label>
                            <p>{token_id}</p>
                        </div>

                    </div>

                )
                :( "")
             }

          </div>

        </section>

      </main>

      <footer className="footer">
          <div className="copyright">
            © Copyright{" "}
            <strong>
              <span>Fcul Grupo01</span>
            </strong>
            . All Rights Reserved
          </div>
          <div className="credits">
            Designed by <a href="#">Grupo01 LTI</a>
          </div>
        </footer>

    </div>
  );
}

export default React.memo(TransportadoraIndex);
