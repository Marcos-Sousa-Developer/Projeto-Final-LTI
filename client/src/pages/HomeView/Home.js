import logo from '../../assets/images/logo.svg';
import UseFetch from '../../hooks/UseFetch';
import { Link  } from "react-router-dom";
import { Navbar } from '../../components/';

function Home() {

  const {state} = UseFetch('/api')

  return (
    <Navbar></Navbar>
  );
}

export default Home;