const login = (user) => {
  console.log("check login",user)
  return { type: "LOGIN", payload: user };

};


const loginFail = (message) => {
  return { type: "LOGIN_FAIL", payload: message };
};

 const loginMiddleware = (user) => {
  return (dispatch) => {
    
    try {
      if (!user.email || !user.password) {
       
        dispatch(loginFail("You didnt give us email or password"));
        return;
      }else{
        dispatch(login(user)); 
        
      }
      
    } catch (error) {
      dispatch(loginFail(error.message)); 
    }
  };
};
export default loginMiddleware