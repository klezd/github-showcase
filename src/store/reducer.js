const initialState = {
  isLoggedin: false,
};

function reducer(state = initialState, action) {
  const { type /* payload */ } = action;

  switch (type) {
    default:
      return {
        ...state,
      };
  }
}

export default reducer;
