import axios from "axios";
import { Backend_URL } from "./utils";

export const addToLikedVideos = async (user, video, dispatch) => {
  try {
    dispatch({
      type: "STATUS",
      payload: { loading: "Adding video to liked videos" },
    });
    const response = await axios.post(`${Backend_URL}/user/liked`, {
      videoId: video._id,
    });
    console.log({ response });
    if (response.status === 201) {
      dispatch({ type: "LIKED", payload: response.data.addedVideo });
    }
  } catch (error) {
    dispatch({
      type: "STATUS",
      payload: { error: "Couldn't add video to liked videos.." },
    });
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
    dispatch({
      type: "STATUS",
      payload: { error: "Removing video from liked, unsuccessful " },
    });
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
    dispatch({
      type: "STATUS",
      payload: { error: "Adding video to history, unsuccessful " },
    });
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
      dispatch({ type: "CLEAR_HISTORY" });
    }
  } catch (error) {
    console.error(error);
  }
};

export const addToWatchLater = async (user, video, dispatch) => {
  try {
    dispatch({
      type: "STATUS",
      payload: { loading: "Adding video to watch later videos" },
    });
    const response = await axios.post(`${Backend_URL}/user/watchlater`, {
      videoId: video._id,
    });
    console.log({ response });
    if (response.status === 201) {
      dispatch({ type: "WATCH_LATER", payload: response.data.addedVideo });
    }
  } catch (error) {
    dispatch({
      type: "STATUS",
      payload: { error: "Couldn't add video to watch later videos.." },
    });
    console.error(error);
  }
};

export const removeFromWatchLater = async (user, video, dispatch) => {
  try {
    const response = await axios.delete(
      `${Backend_URL}/user/watchlater/${video._id}`
    );
    if (response.status === 200) {
      dispatch({ type: "WATCH_LATER_REMOVE", payload: video });
    }
  } catch (error) {
    console.error(error);
    dispatch({
      type: "STATUS",
      payload: { error: "Removing video from watch later, unsuccessful " },
    });
  }
};

export const createPlayListBackend = async (user, playlistTitle, dispatch) => {
  try {
    const response = await axios.post(`${Backend_URL}/user/playlists`, {
      name: playlistTitle,
    });
    console.log("response playlist", { response });

    if (response.status === 200) {
      dispatch({ type: "CREATE_PLAYLIST", payload: response.data.playlist });
    }
  } catch (error) {
    dispatch({
      type: "STATUS",
      payload: { error: `playlist ${playlistTitle} create failed` },
    });
  }
};

export const deletePlayListBackend = async (user, playlist, dispatch) => {
  try {
    const response = await axios.delete(
      `${Backend_URL}/user/playlists/${playlist._id}`
    );
    if (response.status === 200) {
      dispatch({ type: "DELETE_PLAYLIST ", payload: response.data.playlist });
    }
  } catch (error) {
    console.log(error.message);
  }
};

export const addVideoToPlaylist = async (user, playlist, dispatch, video) => {
  console.log(playlist);
  try {
    const response = await axios.post(
      `${Backend_URL}/user/playlists/${playlist._id}`,
      { videos: [...playlist.videos, { videoId: video._id }] }
    );
    if (response.status === 201) {
      dispatch({ type: "ADD_TO_PLAYLIST", payload: response.data.playlist });
    }
  } catch (error) {
    console.log(error);
  }
};

export const deleteVideoFromPlaylist = async (
  user,
  playlist,
  video,
  dispatch
) => {
  try {
    const response = await axios.delete(
      `${Backend_URL}/user/playlists/${playlist._id}/${video._id}}`
    );
    if (response.status === 200) {
      dispatch({
        type: "REMOVE_FROM_PLAYLIST",
        payload: { selectedPlaylist: playlist.name, selectedVideo: video },
      });
    }
  } catch (error) {
    console.log(error);
  }
};
