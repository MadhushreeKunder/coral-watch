import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Backend_URL } from "../utils/utils";
import { setupAuthExceptionHandler, setupAuthHeaderForServiceCalls } from "../utils/setupAuth";

export const AuthContext = createContext();

export const addUser = ({ data, setUser, setToken }) => {
  setUser(data.user);
  setToken(data.token);
  localStorage?.setItem("token", JSON.stringify({ token: data.token }));

  const { _id, username, email } = data.user;
  localStorage?.setItem("user", JSON.stringify({ _id, username, email }));
  setupAuthHeaderForServiceCalls(data.token);
};

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const { token: savedToken } = JSON.parse(localStorage?.getItem("token")) || {
    token: null,
  };

  if (savedToken) {
    setupAuthHeaderForServiceCalls(savedToken);
  }

  const [token, setToken] = useState(savedToken);
  const [user, setUser] = useState({
    _id: "",
    username: "",
    email: "",
    password: "",
  });

  const [status, setStatus] = useState({ loading: "", success: "", error: "" });

  useEffect(() => {
    const userLoggedIn = JSON.parse(localStorage?.getItem("user"));
    userLoggedIn?._id && setUser({ ...userLoggedIn });
    setupAuthExceptionHandler(logout, navigate);
  }, []);

  const loginUserWithCreds = async (username, password)=> {
    try {
      setStatus({ loading: "Please wait..." });
      const { data } = await axios.post(`${Backend_URL}/auth/login`, {
        username: username,
        password: password,
      });

      if (data.success) {
        addUser({ data, setUser, setToken });
        setStatus({
          success: `Login successful. Hello, ${data.user.username}!`,
        });
      }
      return data.success;
    } catch (error) {
      console.error("Error from login!", error);
      setStatus({ error: error.response.data.errorMessage });
      return error;
    }
  }

  const signUpUserWithCreds= async(username, password, email)=> {
    try {
      setStatus({ loading: "Adding user info.." });
      const { data } = await axios.post(`${Backend_URL}/auth/signup`, {
        username: username,
        password: password,
        email: email,
      });

      if (data.success) {
        addUser({ data, setUser, setToken });
        setStatus({
          success: `SignUp successful. Welcome, ${data.user.username}! `,
        });
      }
      return data.success;
    } catch (error) {
      console.error("Error from signup!", error);
      setStatus({
        error: error.response,
        // .data.errorMessage
      });
      return error;
    }
  }

  function logout() {
    localStorage?.removeItem("token");
    localStorage?.removeItem("user");
    setStatus({ loading: "", success: "", error: "" });
    setUser({
      _id: "",
      username: "",
      email: "",
      password: "",
    });
    setToken(null);
    navigate("/");
  }

  return (
    <AuthContext.Provider
      value={{
        status,
        token,
        user,
        setStatus,
        loginUserWithCreds,
        signUpUserWithCreds,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  return useContext(AuthContext);
};
