import { Routes, Route, BrowserRouter  } from "react-router-dom" 
import Home from './pages/HomeView/Home';
import './assets/styles/App.css';
import Dashboard from "./pages/Admin/Dashboard";

function App() {   

  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<Dashboard />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
