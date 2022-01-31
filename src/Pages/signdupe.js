import { useLocation, useNavigate } from "react-router";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useUser } from "../contexts/userContext";
import { useAuth } from "../contexts/authContext";
import { FaUser, FaLock, FaEye, FaEyeSlash, FaEnvelope } from "react-icons/fa";

export const SignDupe = () => {
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
    <div className="h-full ml-44 mt-4 py-8">
      <h2>Sign Up</h2>
      <h3 className="text-white">
        {/* {status?.loading && (
            <img src="/images/loading.svg" alt="loading" className="loading" />
          )} */}
          hello
        <img src="/Images/Loading-blue.svg" alt="loading" className="loading" />
      </h3>
      <form onSubmit={(e) => e.preventDefault()}>
        <div>
          <label>
            <FaEnvelope /> Email
          </label>
          <input
            type="email"
            placeholder="Enter email"
            className="form-input"
            required
            value={signUpCredentials.email}
            onChange={(e) =>
              setSignUpCredentials(() => ({
                ...signUpCredentials,
                message: "",
                email: e.target.value,
              }))
            }
          />
        </div>

        <div>
          <label>
            <FaUser /> Username
          </label>
          <input
            type="text"
            placeholder="Enter username"
            className="form-input"
            required
            value={signUpCredentials.username}
            onChange={(e) =>
              setSignUpCredentials(() => ({
                ...signUpCredentials,
                message: "",
                username: e.target.value,
              }))
            }
          />
        </div>

        <div>
          <label>
            <FaLock /> Password
          </label>
          <input
            className="form-input"
            placeholder="Enter password"
            required
            type={signUpCredentials.showPassword ? "text" : "password"}
            value={signUpCredentials.password}
            onChange={(e) =>
              setSignUpCredentials(() => ({
                ...signUpCredentials,
                message: "",
                password: e.target.value,
              }))
            }
          />

          <button
            className="login-show-password"
            onClick={() =>
              setSignUpCredentials(() => ({
                ...signUpCredentials,
                showPassword: !signUpCredentials.showPassword,
              }))
            }
          >
            {signUpCredentials.showPassword ? <FaEye /> : <FaEyeSlash />}
          </button>
        </div>

        <div>
          <label>
            <FaLock /> Confirm Password
          </label>
          <input
            className="form-input"
            placeholder="Confirm Password"
            required
            type={signUpCredentials.showConfirmPassword ? "text" : "password"}
            value={signUpCredentials.confirmPassword}
            onChange={(e) =>
              setSignUpCredentials(() => ({
                ...signUpCredentials,
                message: "",
                confirmPassword: e.target.value,
              }))
            }
          />

          <button
            className="login-show-password"
            onClick={() =>
              setSignUpCredentials(() => ({
                ...signUpCredentials,
                showConfirmPassword: !signUpCredentials.showConfirmPassword,
              }))
            }
          >
            {signUpCredentials.showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
          </button>
        </div>

        <p>{signUpCredentials.message}</p>

        <button
          className="button button-primary login-button"
          onClick={signUpUser}
        >
          Sign Up
        </button>

        <small className="mg">
          Already have an account?{" "}
          <Link to="/login">
            <span className="login-signup">Login!</span>
          </Link>
        </small>
      </form>
    </div>
  );
};