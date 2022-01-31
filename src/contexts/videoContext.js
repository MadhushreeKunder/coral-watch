import { createContext, useContext, useReducer, useEffect } from "react";
import axios from "axios";
import { Backend_URL } from "../utils/utils";
import { videoReducer} from "../reducers/videoReducer";

export const VideoContext = createContext();

export function VideoProvider({ children }) {
  useEffect(() => {
    (async function () {
      try {
        dispatch({
          type: "STATUS",
          payload: { loading: "loading data from server.." },
        });
        const response = await axios.get(`${Backend_URL}/video`);
        const data = response.data.videos;
        dispatch({ type: "ADD_DATA", payload: data });
        dispatch({
          type: "STATUS",
          payload: { loading: "" },
        });
      } catch (error) {
        console.error(error);
        dispatch({
          type: "STATUS",
          payload: { error: "Try again later..." },
        });
      }
    })();
  }, []);

  const [{ data, status }, dispatch] = useReducer(videoReducer, {
    data: [],
    status: { loading: "", success: "", error: "" },
  });

  return (
    <VideoContext.Provider
      value={{
        data,
        status,
        dispatch,
      }}
    >
      {children}
    </VideoContext.Provider>
  );
}

export function useVideo() {
  return useContext(VideoContext);
}
