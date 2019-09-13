const authReducer = (state = {}, action) => {
  switch(action.type) {
    case 'LOGIN_SUCCESS':
      console.log("login success");
      return {
        ...state,
        singInError: null,
      };
    case 'LOGIN_FAILED':
      console.log('LOGIN ERROR');
      return {
        ...state,
        singInError: action.error,
      };
    case 'SIGNUP_SUCCESS':
      console.log('SIGNUP_SUCCESS');
      return {
        ...state,
        signUpError: null,
      }
    case 'SIGNUP_FAILED':
      console.log('SIGNUP_FAILED');
      return {
        ...state,
        signUpError: action.error,
      };
    case 'SIGNOUT_SUCCESS':
      console.log('SIGNOUT_SUCCESS');
      return state;
    default:
      return state;
  }
}

export default authReducer;