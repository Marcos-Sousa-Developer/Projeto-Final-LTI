import UseFetch from '../../hooks/UseFetch';
import { Link  } from "react-router-dom";
import { Navbar } from '../../components/';
import { Footer } from '../../components/';

function Home() {

  const {state} = UseFetch('/api')

  return (
    <>
      <Navbar></Navbar>
      <Footer></Footer>
    </>
  );

}

export default Home;