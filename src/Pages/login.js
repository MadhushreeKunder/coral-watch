import React from "react";
import { useAuth } from "../contexts/authContext";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Link } from "react-router-dom";

export function Login() {
  const { status, loginUserWithCreds } = useAuth();
  const { state } = useLocation();
  const navigate = useNavigate();
  const [loginCredentials, setLoginCredentials] = useState({
    username: "",
    password: "",
    message: "",
    showPassword: "",
  });

  const loginUser = async () => {

    if (loginCredentials.username && loginCredentials.password) {
      const result = await loginUserWithCreds(
        loginCredentials.username,
        loginCredentials.password
      );

      if (result.success) {
        navigate(state?.from ? state.from : "/");
      }
    } else {
      setLoginCredentials({
        ...loginCredentials,
        message: "Username & Password required",
      });
    }
  };

  return (
    <div className="login-form">
      <h2>Login</h2>
      <div className="login-input">
        <label>
          <i className="fas fa-user"></i> Username
        </label>
        <input
          type="text"
          placeholder="Enter username"
          className="form-input"
          required
          value={loginCredentials.username}
          onChange={(e) =>
            setLoginCredentials(() => ({
              ...loginCredentials,
              msg: "",
              username: e.target.value,
            }))
          }
        />
      </div>

      <div className="login-input ">
        <label>
          <i className="fas fa-lock"></i> Password
        </label>
        <input
          type={loginCredentials.showPassword ? "text" : "password"}
          placeholder="Enter password"
          className="form-input"
          required
          value={loginCredentials.password}
          onChange={(e) =>
            setLoginCredentials(() => ({
              ...loginCredentials,
              msg: "",
              password: e.target.value,
            }))
          }
        />

        <button
          className="login-show-password"
          onClick={() =>
            setLoginCredentials(() => ({
              ...loginCredentials,
              showPassword: !loginCredentials.showPassword,
            }))
          }
        >
          {loginCredentials.showPassword ? (
            <i className="far fa-lg fa-eye"></i>
          ) : (
            <i className="far fa-lg  fa-eye-slash"></i>
          )}
        </button>
      </div>
      <h3>
        {status.loading && (
          <img src="../images/loading.svg" alt="loading" className="loading" />
        )}
      </h3>
      <p>{loginCredentials.msg}</p>
      <button className="button button-primary login-button" onClick={loginUser}>
        Login
      </button>
      <small>
        Don't have an account?{" "}
        <Link to="/signup">
          <span className="login-signup"> Sign up!</span>
        </Link>
      </small>
    </div>
  );
}
