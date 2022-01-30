export const userReducer = (userState, action) => {
    switch (action.type) {
      case "ADD_USER":
        return {
          _id: action.payload,
          liked: [],
          history: [],
          watchLater: [],
          playlists: [],
          loading: "",
        };
  
      case "LOAD_USER_ACTIVITY":
        return {
          ...action.payload,
          loading: "",
          liked: action.payload.liked.map((item) => {return item.videoId}),
          history: action.payload.history.map((item) => {return item.videoId}),
          watchLater: action.payload.watchLater.map((item) => {return item.videoId}),
          playlists: action.payload.playlists.map((item) => {return item.videoId}),
        };
  
      case "STATUS":
        return {
          ...userState,
          loading: action.payload,
        };
  
      default:
        return userState;
    }
  };
  