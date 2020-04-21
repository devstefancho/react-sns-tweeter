export const initialState = {
  isLogged: true,
  userInfo: {
    id: 99,
    nickname: "sungjin CHO",
  },
};

export const LOG_IN = "LOG_IN";

export const loginAction = {
  type: LOG_IN,
  data: {
    isLogged: true,
    userInfo: {
      id: 1,
      nickname: "Login CHO",
    },
  },
};

export const LOG_OUT = "LOG_OUT";

export const logoutAction = {
  type: LOG_OUT,
  data: {
    isLogged: false,
    userInfo: {
      id: 2,
      nickname: "Logout CHO",
    },
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOG_IN:
      return { ...state, isLogged: true, userInfo: action.data };

    case LOG_OUT:
      return { ...state, isLogged: false, userInfo: action.data };

    default:
      return state;
  }
};

export default reducer;
