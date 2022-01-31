export const likeToggle = (item, userState, token) => {
    return token
      ? userState.liked.reduce((acc, value) => {
          return value.videoId._id === item._id ? "text-sky-400" : acc;
        }, "hover:text-white text-gray-300")
      : "hover:text-white text-gray-300";
  };
  

