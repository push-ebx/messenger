import React, {useRef} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {login} from '../API/methods/auth'
import {useHistory} from "react-router-dom";
import {useDispatch} from "react-redux";
import {switchIsAuthAction} from "../store/authReducer";

const Login = () => {
  const dispatch = useDispatch()
  const log = useRef();
  const pass = useRef();
  const router = useHistory()

  const Login = async () => {
      await login(log.current.value, pass.current.value).then(res => {
        const error_code = res.data.error?.code;
        if (error_code) {
          error_code === 404 && console.log("User not found");
          error_code === 422 && console.log("Entered invalid password");
        } else {
          document.cookie = `access_token=${res.data.token}; expires=Tue, 19 Jan 2038 03:14:07 UTC;`;
          dispatch(switchIsAuthAction(true));
          router.push("/chats")
        }
      }).catch(err => err.response.status === 400 && console.log("Login error"));
  }

  const handleChange = (e) => {
    if (e.keyCode === 13) {
      Login()
    }
  }

  return (
      <div className="container d-flex justify-content-center align-items-center">
        <div className="col-3 d-flex flex-column align-items-center" style={{margin: "25%"}}>
          <input ref={log} type="text" className="form-control" id="login" placeholder="login"/>
          <input style={{margin: '10px'}} ref={pass} type="password" className="form-control" id="password"
                 placeholder="password" onKeyDown={e => handleChange(e)}/>
          <button type="button" className="btn btn-primary" style={{width: '100%'}} onClick={Login}>Войти</button>
          <button type="button" className="btn btn-success" style={{width: '100%', margin: '10px'}}
                  onClick={() => router.push('/register')}>Зарегистрироваться
          </button>
        </div>
      </div>
  );
};

export default Login;