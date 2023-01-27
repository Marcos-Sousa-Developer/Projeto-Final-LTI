import logo from './logo.svg';
import './App.css'; 
import useFetch from './resquestFunctions/useFetch';

function App() {   

  const {state} = useFetch('/api')

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
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

export default App;
