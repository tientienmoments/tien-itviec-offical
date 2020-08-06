let initialState = {
  user: {
    email: "",
    password: "",
    isAuthenticated: false,
  },
  error: "",
  loading: false,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case "LOGIN":
      state.user.email = action.payload.email;
      state.user.password = action.payload.password;
      state.user.isAuthenticated = true;
      state.error = "";
      break;
      case "LOGIN_FAIL":
      state.loading = false;
      state.error = action.payload;
      state.user.isAuthenticated = false;
      break;
      
    
  }
  console.log("state", state, "user", state.user);

  return { ...state };
}

export default reducer;
