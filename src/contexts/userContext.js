import { createContext, useContext, useEffect, useReducer } from "react";
import React from "react";
import axios from "axios";
import { useAuth } from "./authContext";
import { userReducer } from "../reducers/userReducer";
import { Backend_URL } from "../utils/utils";

export const UserContext = createContext();

export function UserProvider({ children }) {
  const { token, user } = useAuth();

  useEffect(() => {
    if (token) {
      (async () => {
        try {
          const response = await axios.get(`${Backend_URL}/user`);
          const data = response.data.user;
          userDispatch({ type: "LOAD_USER_ACTIVITY", payload: data });
        } catch (error) {
          userDispatch({ type: "STATUS", payload: {error: "Try again!"}})
          console.log("UserContext error:", error.response);
        }
      })();
    }
  }, [token, user ]);

  const [userState, userDispatch] = useReducer(userReducer, {
    // _id: "1",
    status: { loading: "", success: "", error: "" },
    liked: [],
    history: [],
    watchLater: [],
    playlists: [
      { videos: []}
    ],
  });

  return (
    <UserContext.Provider value={{ userState, userDispatch }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
