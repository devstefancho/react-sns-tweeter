export const initialState = {
  mainPosts: [
    {
      userPost: {
        nickName: undefined,
      },
      content: undefined,
      img: undefined,
    },
  ],
  imagePaths: [],
};

export const ADD_POST = "ADD_POST";

const dummy = {
  data: {
    userPost: {
      nickName: "CHo",
    },
    content: "first blog",
    img: "https://img.icons8.com/plasticine/2x/image.png",
  },
};

export const addPostAction = {
  type: ADD_POST,
  data: [dummy.data],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST:
      return { ...state, mainPost: action.data };

    default:
      return { ...state };
  }
};

export default reducer;
