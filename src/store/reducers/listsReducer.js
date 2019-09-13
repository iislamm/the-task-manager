const listsReducer = (state = { createDialog: false }, action) => {
  switch(action.type) {
    case 'LIST_CREATE_SUCCESS':
      console.log('LIST_CREATE_SUCCESS');
      return {
        ...state,
        error: null,
        success: true,
      };
    case 'LIST_CREATE_FAIL':
      console.log(action.error);
      return {
        ...state,
        error: action.error,
        success: false,
      };
    case 'OPEN_LIST_CREATE_DIALOG':
      return {
        ...state,
        createDialog: true
      }
    case 'CLOSE_LIST_CREATE_DIALOG':
      return {
        ...state,
        createDialog: false
      }
    default:
      return {
        ...state,
        success: false,
      };
  }
}

export default listsReducer;