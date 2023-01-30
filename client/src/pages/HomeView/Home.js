import logo from '../../assets/images/logo.svg';
import UseFetch from '../../hooks/UseFetch';
import { Link  } from "react-router-dom" 

function Home() {   

  const {state} = UseFetch('/api')

  return (
    
    <div className="App"> 

      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <li> <Link to="/admin">Admin</Link></li>
        <p>
          {state}  
        </p> 
        <p>
          ?? Bem vindo ao GreaterGoods or ShopZone (For choose) ??
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default Home;
