import './styles/app.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import cookie from 'cookie'
import {BrowserRouter} from "react-router-dom";
import AppRouter from './components/AppRouter'
import {useState} from "react";
import {AuthContext} from "./context/auth_context";
import {ThisUserContext} from "./context/thisUser_context";
import {CompanionContext} from "./context/companion_context";

function App() {
  const [isAuth, setIsAuth] = useState(!!cookie.parse(document.cookie).access_token); // check token on valid
  const [thisUser, setThisUser] = useState({
    id: null,
    username: "NoName",
    first_name: "NoName",
    last_name: "NoName",
    sex: null
  })
  const [companion, setCompanion] = useState({})
  return (
      <AuthContext.Provider value={{
        isAuth,
        setIsAuth
      }}>
        <ThisUserContext.Provider value={{
          thisUser,
          setThisUser
        }}>
          <CompanionContext.Provider value={{
            companion,
            setCompanion
          }}>
            <BrowserRouter>
              <AppRouter/>
            </BrowserRouter>
          </CompanionContext.Provider>
        </ThisUserContext.Provider>
      </AuthContext.Provider>
  );
}

export default App;
