import React, { useEffect, useState} from 'react'
import {Helmet, HelmetProvider} from 'react-helmet-async'; 
import "../assets/vendor/bootstrap/css/bootstrap.min.css"
import "../assets/vendor/bootstrap-icons/bootstrap-icons.css"
import "../assets/vendor/boxicons/css/boxicons.min.css"
import "../assets/vendor/quill/quill.snow.css"
import "../assets/vendor/quill/quill.bubble.css"
import "../assets/vendor/remixicon/remixicon.css"
import "../assets/vendor/simple-datatables/style.css"
import "../assets/styles/style.css" 

function Head() {

  const [head, setHead] = useState();

  useEffect(() => { 

     setHead(
      <HelmetProvider>
        <Helmet>

          <meta charset="utf-8"></meta>
          <meta content="width=device-width, initial-scale=1.0" name="viewport"></meta>
          
          {/*Admin Logo*/}
          <link src={require("../assets/images/admin_logo.png")} rel="adminIcon"></link>

          {/*Google Fonts*/}
          <link href="https://fonts.gstatic.com" rel="preconnect"></link>
          <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,600,600i,700,700i|Nunito:300,300i,400,400i,600,600i,700,700i|Poppins:300,300i,400,400i,500,500i,600,600i,700,700i" rel="stylesheet"></link>
          
        </Helmet>
      </HelmetProvider>
    );
    
  }, []);
  
  return (
    head
  )
}

export default Head
