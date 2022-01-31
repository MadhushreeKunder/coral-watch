export const likeToggle = (item, userState, token) => {
    return token
      ? userState.liked.reduce((acc, value) => {
          return value.videoId._id === item._id ? "text-sky-400" : acc;
        }, " text-gray-400 hover:text-white")
      : " text-gray-400 hover:text-white";
  };
  
export const watchlaterToggle = (item, userState, token) => {
  return token
    ? userState.watchlater.reduce((acc, value) => {
        return value.videoId._id === item._id ? "text-sky-400" : acc;
      }, " text-gray-400 hover:text-white")
    : " text-gray-400 hover:text-white";
};

