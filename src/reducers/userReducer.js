export const userReducer = (state, action) => {
    switch (action.type) {
      
      case "LOAD_USER_ACTIVITY":
        return {
          // ...action.payload,
          // loading: "",
          // liked: action.payload.liked.map((item) => {return item.videoId}),
          // history: action.payload.history.map((item) => {return item.videoId}),
          // watchLater: action.payload.watchLater.map((item) => {return item.videoId}),
          // playlists: action.payload.playlists.map((item) => {return item.videoId}),
          liked: action.payload.liked,
          history: action.payload.history,
          watchLater: action.payload.watchLater,
          playlists: action.payload.playlists,
        };
  
      case "STATUS":
        return {
          ...state,
          loading: action.payload,
        };

      case "LIKED":
        return {
          ...state, liked: state.liked.concat(action.payload)
        }

      case "LIKED_REMOVE":
        return {...state, liked: state.liked.filter((item) => {
          return item.videoId._id !== action.payload._id;
        })}
      



  
      default:
        return state;
    }
  };
  