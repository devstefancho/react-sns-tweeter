export const ADD_POST_REQUEST = "ADD_POST_REQUEST";
export const ADD_POST_SUCCESS = "ADD_POST_SUCCESS";
export const ADD_POST_FAILURE = "ADD_POST_FAILURE";
export const ADD_COMMENT_REQUEST = "ADD_COMMENT_REQUEST";
export const ADD_COMMENT_SUCCESS = "ADD_COMMENT_SUCCESS";
export const ADD_COMMENT_FAILURE = "ADD_COMMENT_FAILURE";
export const LOAD_POSTS_REQUEST = "LOAD_POSTS_REQUEST";
export const LOAD_POSTS_SUCCESS = "LOAD_POSTS_SUCCESS";
export const LOAD_POSTS_FAILURE = "LOAD_POSTS_FAILURE";

export const initialState = {
  mainPosts: [],
  imagePaths: [],
  isAddingPost: false,
  isAddedPost: false,
  postErrorReason: "",
  isAddingComment: false,
  isAddedComment: false,
  commentErrorReason: "",
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
        isAddedPost: false,
        isAddingPost: true,
      };
    case ADD_POST_SUCCESS:
      return {
        ...state,
        mainPosts: [action.data, ...state.mainPosts],
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
        isAddedComment: false,
        commentErrorReason: false,
      };

    case LOAD_POSTS_REQUEST:
      return {
        ...state,
      };
    case LOAD_POSTS_SUCCESS:
      return {
        ...state,
        mainPosts: action.data,
      };
    case LOAD_POSTS_FAILURE:
      return {
        ...state,
      };
    default:
      return { ...state };
  }
};

export default reducer;
