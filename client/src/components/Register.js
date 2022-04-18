import React, {useRef} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {registration} from '../API/methods/auth'
import {useHistory} from "react-router-dom";
import {useDispatch} from "react-redux";
import {switchIsAuthAction} from "../store/authReducer";

const Register = () => {
  const dispatch = useDispatch()
  const username = useRef();
  const password = useRef();
  const first_name = useRef();
  const last_name = useRef();
  const router = useHistory()


  const register = () => {
    const new_user = {
      username: username.current.value,
      first_name: first_name.current.value,
      last_name: last_name.current.value,
      password: password.current.value,
      sex: 1
    }
    registration(new_user).then(res => {
      const error_code = res.data.error?.code;
      if (error_code) {
        error_code === 421 && console.log("The user has already been created");
        error_code === 422 && console.log(res.data.error);
      } else {
        document.cookie = `access_token=${res.data.token}; expires=Tue, 19 Jan 2038 03:14:07 UTC;`;
        dispatch(switchIsAuthAction(true));
        router.push("/chats")
      }
    }).catch(err => err.response.status === 400 && console.log("Registration error"));
  }

  return (
      <div className="container d-flex justify-content-center align-items-center">
        <div className="col-lg-3 col d-flex flex-column align-items-center" style={{margin: "25%"}}>
          <input ref={username} type="text" className="form-control" id="username" placeholder="Username"/>
          <input style={{margin:'10px'}} ref={first_name} type="text" className="form-control" id="first_name" placeholder="First name"/>
          <input ref={last_name} type="text" className="form-control" id="last_name" placeholder="Last name"/>
          <input style={{margin:'10px'}} ref={password} type="password" className="form-control" id="password" placeholder="Password"/>
          <button type="button" className="btn btn-success" onClick={register} style={{width: '100%'}}>Зарегистрироваться</button>
          <button type="button" className="btn btn-primary" style={{width: '100%', margin: 10}} onClick={() => router.push('/login')}>Войти</button>
        </div>
      </div>
  );
};

export default Register;