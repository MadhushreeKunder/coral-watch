import { useLocation, useNavigate } from "react-router";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth, useUser } from "../contexts";
import { FaUser, FaLock, FaEye, FaEyeSlash, FaEnvelope } from "react-icons/fa";

export const SignUp = () => {
  const { status, signUpUserWithCreds } = useAuth();
  const { userDispatch } = useUser();
  const { state } = useLocation();
  const navigate = useNavigate();

  const [signUpCredentials, setSignUpCredentials] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    showPassword: false,
    showConfirmPassword: false,
    message: "",
  });

  const signUpUser = async () => {
    if (
      signUpCredentials.email &&
      signUpCredentials.username &&
      signUpCredentials.password
    ) {
      if (
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
          signUpCredentials.email
        )
      ) {
        if (signUpCredentials.password === signUpCredentials.confirmPassword) {
          const result = await signUpUserWithCreds(
            signUpCredentials.username,
            signUpCredentials.password,
            signUpCredentials.email
          );
          if (result.success) {
            userDispatch({ type: "ADD_USER", payload: result.user._id });
            navigate(state?.from ? state.from : "/");
          }
        } else {
          setSignUpCredentials({
            ...signUpCredentials,
            message: "Passwords doesn't Match",
          });
        }
      } else {
        setSignUpCredentials({
          ...signUpCredentials,
          message: "Enter a valid email id",
        });
      }
    } else {
      setSignUpCredentials({
        ...signUpCredentials,
        message: "Every field is required",
      });
    }
  };

  return (
    <div className="h-screen mt-4 pt-7">
      <div className="p-8 w-max flex flex-col items-center m-auto border-2 border-solid border-slate-800 rounded-lg text-white">
        <h1 className="text-white text-2xl font-semibold">SignUp</h1>{" "}
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
              <FaEnvelope className="inline" /> Email
            </label>
            <input
              type="email"
              placeholder="Enter email"
              className="text-slate-900 font-medium p-2"
              required
              value={signUpCredentials.email}
              onChange={(e) =>
                setSignUpCredentials(() => ({
                  ...signUpCredentials,
                  email: e.target.value,
                }))
              }
            />
          </div>

          <div className="flex flex-col w-60 m-4">
            <label className="mb-2 text-gray-300">
              <FaUser className="inline" /> Username
            </label>
            <input
              type="text"
              placeholder="Enter username"
              className="text-slate-900 font-medium  p-2"
              required
              value={signUpCredentials.username}
              onChange={(e) =>
                setSignUpCredentials(() => ({
                  ...signUpCredentials,
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
              className="text-slate-900 font-medium  p-2 "
              placeholder="Enter password"
              required
              type={signUpCredentials.showPassword ? "text" : "password"}
              value={signUpCredentials.password}
              onChange={(e) =>
                setSignUpCredentials(() => ({
                  ...signUpCredentials,
                  password: e.target.value,
                }))
              }
            />

            <button
              className="text-slate-900 absolute right-3 top-11"
              onClick={() =>
                setSignUpCredentials(() => ({
                  ...signUpCredentials,
                  showPassword: !signUpCredentials.showPassword,
                }))
              }
            >
              {signUpCredentials.showPassword ? <FaEye /> : <FaEyeSlash />}{" "}
            </button>
          </div>

          <div className="flex flex-col w-60 m-4 relative">
            <label className="mb-2 text-gray-300">
              <FaLock className="inline" /> Confirm Password
            </label>
            <input
              className="text-slate-900 font-medium  p-2"
              placeholder="Confirm Password"
              required
              type={signUpCredentials.showConfirmPassword ? "text" : "password"}
              value={signUpCredentials.confirmPassword}
              onChange={(e) =>
                setSignUpCredentials(() => ({
                  ...signUpCredentials,
                  confirmPassword: e.target.value,
                }))
              }
            />

            <button
              className="text-slate-900 absolute right-3 top-11"
              onClick={() =>
                setSignUpCredentials(() => ({
                  ...signUpCredentials,
                  showConfirmPassword: !signUpCredentials.showConfirmPassword,
                }))
              }
            >
              {signUpCredentials.showConfirmPassword ? (
                <FaEye />
              ) : (
                <FaEyeSlash />
              )}
            </button>
          </div>

          <p>{signUpCredentials.message}</p>

          <button
            className="py-2 px-4 m-4 block w-fit rounded-lg bg-cyan-500 shadow-lg shadow-cyan-500/50 active:shadow-gray-900 text-slate-900 font-bold"
            onClick={signUpUser}
          >
            Sign Up
          </button>

          <small className="text-base">
            Already have an account?{" "}
            <Link to="/login">
              <span className="text-sky-400 hover:underline">Login!</span>
            </Link>
          </small>
        </form>
        {/* <h3>
          {status?.loading && (
            <img src="/Images/Loading-blue.svg" alt="loading" />
          )}
        </h3> */}
      </div>
    </div>
  );
};
