import React, { useState } from "react";
import "../../../../style/Login.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Alert } from "antd";
import logo from "../../../../Assets/logo.png";

const Login = () => {
  const [error, setError] = useState("");
  const history = useNavigate();
  const [values, setValues] = useState({ matricule: "", password: "" });
  const postdata = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8800/login", values)
      .then((data) => {
        localStorage.setItem("token", data.data.token);
        setValues({ matricule: "", password: "" });
        history("/autorisation_rebut")
      })
      .catch((err) => {
        console.log(values)
        setValues({ matricule: "", password: "" });
        setError(err.response.data.msg);
      });
  };
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  return (
      <div className="login-dark">
        <form method="post" onSubmit={postdata}>
          <h2 className="sr-only">connexion</h2>
          <div className="illustration">
            <img src={logo} alt="logo" style={{width:"170px"}}/>
          </div>
          <div className="form-group">
            <input
              className="form-control"
              type="text"
              name="matricule"
              required
              placeholder="entrer votre matricule"
              value={values.matricule}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              className="form-control"
              type="password"
              name="password"
              required
              placeholder="entrer votre mot de passe"
              value={values.password}
              onChange={(e) => {
                handleChange(e);
              }}
            />
          </div>
          <div className="form-group">
            <button className="btn btn-primary btn-block" type="submit">
              connecter
            </button>
          </div>
          {error && <Alert message={error} type="error" />}
        </form>
      </div>
  );
};

export default Login;