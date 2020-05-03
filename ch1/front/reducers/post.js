export const ADD_POST_REQUEST = "ADD_POST_REQUEST";
export const ADD_POST_SUCCESS = "ADD_POST_SUCCESS";
export const ADD_POST_FAILURE = "ADD_POST_FAILURE";
export const ADD_COMMENT_REQUEST = "ADD_COMMENT_REQUEST";
export const ADD_COMMENT_SUCCESS = "ADD_COMMENT_SUCCESS";
export const ADD_COMMENT_FAILURE = "ADD_COMMENT_FAILURE";

export const initialState = {
  mainPosts: [
    {
      id: 1,
      User: {
        id: 1,
        nickName: "1 cho",
      },
      content: "first cho",
      img: "https://img.icons8.com/plasticine/2x/image.png",
      Comments: [],
    },
    {
      id: 2,
      User: {
        id: 1,
        nickName: "2 cho",
      },
      content: "second Post",
      Comments: [],
      img: "https://img.icons8.com/plasticine/2x/image.png",
    },
  ],
  imagePaths: [],
  isAddingPost: false,
  isAddedPost: false,
  postErrorReason: "",
  isAddingComment: false,
  isAddedComment: false,
  commentErrorReason: "",
};

const dummyPost = {
  id: 3,
  User: {
    id: 1,
    nickName: "dum cho",
  },
  content: "dummy Post",
  Comments: [],
  img: "https://img.icons8.com/plasticine/2x/image.png",
};
const dummyComment = {
  id: 2,
  User: {
    id: 1,
    nickName: "dum cho",
  },
  Comments: "this is dummy",
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
    case ADD_COMMENT_REQUEST:
      return {
        ...state,
        isAddedComment: false,
        isAddingComment: true,
      };
    case ADD_COMMENT_SUCCESS: {
      const postIndex = state.mainPosts.findIndex(
        (v) => v.id === action.data.postId
      );
      // console.log(action.data.postId, postIndex);
      const post = state.mainPosts[postIndex];
      const Comments = [...post.Comments, dummyComment];
      const mainPosts = [...state.mainPosts];
      mainPosts[postIndex] = { ...post, Comments };
      return {
        ...state,
        mainPosts,
        isAddedComment: true,
        isAddingComment: false,
      };
    }
    case ADD_COMMENT_FAILURE:
      return {
        ...state,
        mainPost: action.data,
        isAddedComment: false,
        commentErrorReason: false,
      };
    default:
      return { ...state };
  }
};

export default reducer;
