const getIsLoggedIn = state => state.auth.isloggedIn;
const getIsRefreshing = state => state.auth.isRefreshing;
const getUserName = state => state.auth.user.name;

const authSelectors = {
  getIsLoggedIn,
  getUserName,
  getIsRefreshing,
};
export default authSelectors;
