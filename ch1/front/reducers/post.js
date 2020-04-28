export const ADD_POST_REQUEST = "ADD_POST_REQUEST";
export const ADD_POST_SUCCESS = "ADD_POST_SUCCESS";
export const ADD_POST_FAILURE = "ADD_POST_FAILURE";

export const initialState = {
  isAddingPost: false,
  isAddedPost: false,
  mainPosts: [
    {
      userPost: {
        nickName: "",
      },
      content: "",
      img: "https://img.icons8.com/plasticine/2x/image.png",
    },
  ],
  imagePaths: [],
  postErrorReason: null,
};

const dummyPost = {
  userPost: {
    nickName: "dum cho",
  },
  content: "dummy Post",
  img: "https://img.icons8.com/plasticine/2x/image.png",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST_REQUEST:
      return {
        ...state,
        mainPost: action.data,
        isAddedPost: false,
        isAddingPost: true,
      };
    case ADD_POST_SUCCESS:
      return {
        ...state,
        mainPosts: [dummyPost, ...state.mainPosts],
        isAddedPost: true,
        isAddingPost: false,
      };
    case ADD_POST_FAILURE:
      return {
        ...state,
        mainPost: action.data,
        isAddedPost: false,
        isAddingPost: false,
      };

    default:
      return { ...state };
  }
};

export default reducer;
