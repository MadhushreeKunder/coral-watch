import React from "react";
import { useAuth } from "../contexts/authContext";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Link } from "react-router-dom";
import { FaUser, FaLock, FaEye, FaEyeSlash, FaEnvelope } from "react-icons/fa";

export function Login() {
  const { status, loginUserWithCreds } = useAuth();
  const { state } = useLocation();
  const navigate = useNavigate();
  const [loginCredentials, setLoginCredentials] = useState({
    username: "",
    password: "",
    msg: "",
    showPassword: false,
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
        msg: "Username & Password required",
      });
    }
  };

  return (
    <div className="h-screen mt-4 pt-7">
      <div className="p-8 w-max flex flex-col items-center m-auto border-2 border-solid border-slate-800 rounded-lg text-white">
        <h2 className="text-white text-2xl font-semibold">Login</h2>
        <h3 className="fixed z-10 pt-40  top-0  h-full overflow-auto bg-opacity-10">
          {status?.loading && (
            <img src="/Images/Loading-blue.svg" alt="loading" />
          )}
        </h3>
        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex flex-col items-center justify-center align-middle my-4 mx-auto"
        >
          <div className="flex flex-col w-60 m-4">
            <label className="mb-2 text-gray-300">
              <FaUser className="inline" /> Username
            </label>
            <input
              type="text"
              placeholder="Enter username"
              className="text-slate-900 font-medium  p-2 "
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

          <div className="flex flex-col w-60 m-4 relative">
            <label className="mb-2 text-gray-300">
              <FaLock className="inline" /> Password
            </label>
            <input
              type={loginCredentials.showPassword ? "text" : "password"}
              placeholder="Enter password"
              className="text-slate-900 font-medium  p-2 "
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
              className="text-slate-900 absolute right-3 top-11"
              onClick={() =>
                setLoginCredentials(() => ({
                  ...loginCredentials,
                  showPassword: !loginCredentials.showPassword,
                }))
              }
            >
              {loginCredentials.showPassword ? <FaEye /> : <FaEyeSlash />}
            </button>
          </div>
          <p>{loginCredentials.msg}</p>
          <button
            className="py-2 px-4 m-4 block w-fit rounded-lg bg-cyan-500 shadow-lg shadow-cyan-500/50 active:shadow-gray-900 text-slate-900 font-bold"
            onClick={loginUser}
          >
            Login
          </button>
          <small className="text-base">
            Don't have an account?{" "}
            <Link to="/signup">
              <span className="text-sky-400 hover:underline"> Sign up!</span>
            </Link>
          </small>
        </form>
      </div>
    </div>
  );
}
