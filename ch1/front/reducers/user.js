export const initialState = {
  isLogged: false,
  userInfo: {
    id: "",
    nickName: "",
    password: "",
  },
};

export const LOG_IN = "LOG_IN";

export const loginAction = {
  type: LOG_IN,
  data: {
    isLogged: true,
    userInfo: {
      id: 1,
      nickName: "Login CHO",
    },
  },
};

export const LOG_OUT = "LOG_OUT";

export const logoutAction = {
  type: LOG_OUT,
  data: {
    isLogged: false,
    userInfo: {},
  },
};

export const SIGN_UP = "SIGN_UP";
export const SignUpAction = (data) => {
  return {
    type: SIGN_UP,
    data: data,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOG_IN:
      return { ...state, isLogged: true, userInfo: action.data };

    case LOG_OUT:
      return { ...state, isLogged: false, userInfo: action.data };

    case SIGN_UP:
      return { ...state, userInfo: action.data };

    default:
      return state;
  }
};

export default reducer;
