const tasksReducer = (state = { createDialog: false }, action) => {
  switch(action.type) {
    case 'TASK_CREATE_SUCCESS':
      console.log('TASK_CREATE_SUCCESS');
      return {
        ...state,
        create: {
            error: null,
            success: true,
        }
      };
    case 'TASK_CREATE_FAIL':
      console.log(action.error);
      return {
        ...state,
        create: {
            error: action.error,
            success: false,
        }
      };
    case 'TASK_UPDATE_SUCCESS':
      console.log('TASK_UPDATE_SUCCESS');
      return {
        ...state,
        update: {
          error: null,
          success: true,
        }
      }
    case 'TASK_UPDATE_FAIL':
      console.log('TASK_UPDATE_FAIL');
      return {
        ...state,
        error: action.error,
        success: false,
      }
    case 'OPEN_TASK_CREATE_DIALOG':
      return {
        ...state,
        createDialog: true
      }
    case 'CLOSE_TASK_CREATE_DIALOG':
      return {
        ...state,
        createDialog: false
      }
    default:
      return {
        ...state,
        create: {
            success: null,
            error: null,
        }
      };
  }
}

export default tasksReducer;