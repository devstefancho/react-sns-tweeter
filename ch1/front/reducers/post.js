export const initialState = {
  mainPost: {
    id: 77,
    nickName: "User Post",
    content: "this is user content",
  },
};

export const ADD_DUMMY = "ADD_DUMMY";
export const ADD_POST = "ADD_POST";

export const addDummyAction = {
  type: ADD_DUMMY,
  data: {
    id: "777",
    nickName: "dummy data !!",
    content: "empty content !!",
  },
};

export const addPostAction = {
  type: ADD_POST,
  data: {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_DUMMY:
      return { ...state, mainPost: action.data };

    case ADD_POST:
      return { ...state, mainPost: action.data };
    default:
      return { ...state };
  }
};

export default reducer;
