import './styles/app.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import cookie from 'cookie'
import {BrowserRouter} from "react-router-dom";
import AppRouter from './components/AppRouter'

// чекать токен на истечение срока
const isAuth = !!cookie.parse(document.cookie).access_token;

function App() {
  return (
      <BrowserRouter>
        <AppRouter/>
      </BrowserRouter>
  );
}

export default App;
