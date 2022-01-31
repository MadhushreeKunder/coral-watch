export const videoReducer = (state, action) => {
  switch (action.type) {
    case "ADD_DATA":
      return { ...state, data: action.payload };

      case "STATUS":
        return {
          ...state,
          status: action.payload,
        };

    default:
      return state;
  }
};
