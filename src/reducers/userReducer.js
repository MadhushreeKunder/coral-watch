export const userReducer = (state, action) => {
  switch (action.type) {
    case "LOAD_USER_ACTIVITY":
      return {
        // ...action.payload,
        // loading: "",
        // liked: action.payload.liked.map((item) => {return item.videoId}),
        // history: action.payload.history.map((item) => {return item.videoId}),
        // watchlater: action.payload.watchlater.map((item) => {return item.videoId}),
        // playlists: action.payload.playlists.map((item) => {return item.videoId}),
        liked: action.payload.liked,
        history: action.payload.history,
        watchlater: action.payload.watchlater,
        playlists: action.payload.playlists,
        status: { loading: "", success: "", error: "" },
      };

    case "STATUS":
      return {
        ...state,
        loading: action.payload,
      };

    case "LIKED":
      return {
        ...state,
        liked: state.liked.concat(action.payload),
      };

    case "LIKED_REMOVE":
      return {
        ...state,
        liked: state.liked.filter((item) => {
          return item.videoId._id !== action.payload._id;
        }),
      };

    case "WATCH_LATER":
      return {
        ...state,
        watchlater: state.watchlater.concat(action.payload),
      };

    case "WATCH_LATER_REMOVE":
      return {
        ...state,
        watchlater: state.watchlater.filter((item) => {
          return item.videoId._id !== action.payload._id;
        }),
      };

    case "ADD_TO_HISTORY":
      return {
        ...state,
        history: state.history.some(
          (element) => element.videoId._id === action.payload._id
        )
          ? state.history
          : state.history.concat(action.payload),
      };

    case "REMOVE_FROM_HISTORY":
      return {
        ...state,
        history: state.history.filter((item) => {
          return item.videoId._id !== action.payload._id;
        }),
      };

    case "CLEAR_HISTORY":
      return {
        ...state,
        history: state.history.splice(0, state.history.length),
      };

    case "CREATE_PLAYLIST":
      return {
        ...state,
        playlists: state.playlists.concat(action.payload),
      };

    case "DELETE_PLAYLIST":
      return {
        ...state,
        playlists: state.playlists.filter((item) => {
          return item._id !== action.payload._id;
        }),
      };

    case "ADD_TO_PLAYLIST":
      return {
        ...state,
        playlists: state.playlists.map((item) => {
          return item._id === action.payload._id ? action.payload : item;
        }),
      };

    case "REMOVE_FROM_PLAYLIST":
      return {
        ...state,
        playlists: state.playlists.map((item) => {
          return item.name === action.payload.selectedPlayList
            ? {
                ...item,
                videos: item.videos.filter(
                  (video) =>
                    video.videoId._id !== action.payload.selectedVideo._id
                ),
              }
            : item;
        }),
      };

    default:
      return state;
  }
};
