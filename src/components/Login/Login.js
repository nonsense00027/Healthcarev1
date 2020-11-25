import React, { useState } from "react";
import "./Login.css";
import login from "../../img/login.svg";
import { Button, TextField } from "@material-ui/core";
import { auth } from "../../firebase";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const handleError = (code) => {
    switch (code) {
      case "auth/user-not-found":
        setError("User not found");
        break;
      default:
        setError("Invalid Credentials");
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .catch((err) => handleError(err.code));
  };
  return (
    <div className="login">
      <img src={login} alt="" className="login__img" />
      <div className="login__content">
        <center>
          <h5>Welcome to System name</h5>
        </center>
        <form onSubmit={(e) => handleLogin(e)} className="login__form">
          <div>
            <TextField
              label="Email address"
              autoFocus
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <TextField
              label="Password"
              type="password"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error.length > 0 && (
            <center>
              <p className="login__error">{error}</p>
            </center>
          )}
          <Button variant="contained" color="primary" type="submit" fullWidth>
            Log in
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Login;
