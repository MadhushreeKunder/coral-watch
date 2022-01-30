import axios from "axios";
import { Backend_URL } from "./utils";

export const addToLikedVideos = async (user, video, dispatch) => {
  try {
    const response = await axios.post(`${Backend_URL}/user/liked`, {
      videoId: video._id,
    });
    if (response.status === 201) {
      dispatch({ type: "LIKED", payload: response.data.addedVideo });
    }
  } catch (error) {
    console.error(error);
  }
};

export const removeFromLikedVideos = async (user, video, dispatch) => {
  try {
    const response = await axios.delete(
      `${Backend_URL}/user/liked/${video._id}`
    );
    if (response.status === 200) {
      dispatch({ type: "LIKED_REMOVE", payload: video });
    }
  } catch (error) {
    console.error(error);
  }
};

export const addToHistory = async (user, video, dispatch) => {
  try {
    const response = await axios.post(`${Backend_URL}/user/history`, {
      videoId: video._id,
    });
    if (response.status === 201) {
      dispatch({ type: "ADD_TO_HISTORY", payload: response.data.addedVideo });
    }
  } catch (error) {
    console.error(error);
  }
};


export const removeFromHistory = async (user, video, dispatch) => {
    try {
      const response = await axios.delete(
        `${Backend_URL}/user/history/${video._id}`
      );
      if (response.status === 200) {
        dispatch({ type: "REMOVE_FROM_HISTORY", payload: video });
      }
    } catch (error) {
      console.error(error);
    }
  };

  export const clearHistory = async (user, dispatch) => {
    try {
        const response = await axios.delete(`${Backend_URL}/user/history`);
        if (response.status === 200) {
            dispatch({ type: "CLEAR_HISTORY"});
        }
    } catch(error){
        console.error(error);
    }
  }