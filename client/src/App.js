import './styles/app.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import cookie from 'cookie'
import {BrowserRouter} from "react-router-dom";
import AppRouter from './components/AppRouter'
import {useState} from "react";
import {AuthContext} from "./context";

function App() {
  const [isAuth, setIsAuth] = useState(!!cookie.parse(document.cookie).access_token); // check token on valid
  return (
      <AuthContext.Provider value={{
        isAuth,
        setIsAuth
      }}>
        <BrowserRouter>
          <AppRouter/>
        </BrowserRouter>
      </AuthContext.Provider>
  );
}

export default App;
