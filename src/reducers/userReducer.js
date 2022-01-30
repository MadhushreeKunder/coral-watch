export const userReducer = (state, action) => {
    switch (action.type) {
      
      case "LOAD_USER_ACTIVITY":
        return {
          ...action.payload,
          // loading: "",
          liked: action.payload.liked.map((item) => {return item.videoId}),
          history: action.payload.history.map((item) => {return item.videoId}),
          watchLater: action.payload.watchLater.map((item) => {return item.videoId}),
          playlists: action.payload.playlists.map((item) => {return item.videoId}),
        };
  
      // case "STATUS":
      //   return {
      //     ...userState,
      //     loading: action.payload,
      //   };

      case "LIKED":
        return {
          ...state, liked: state.liked.concat(action.payload)
        }



  
      default:
        return state;
    }
  };
  