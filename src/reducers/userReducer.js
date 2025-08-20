const userReducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_FIELD':
      return { ...state, [action.field]: action.value };
    case 'SET_USER':
      return {
        ...state,
        ...action.user
      };
    default:
      return state;
  }
};

export default userReducer;
