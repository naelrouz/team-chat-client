import JWTDecode from 'jwt-decode';
import store from '../store';

const isAuth = () => {
  const { token, refreshToken } = store.getters.getTokens;
  try {
    JWTDecode(token);
    JWTDecode(refreshToken);
  } catch (err) {
    console.log('isAuth.err: ', err);
    return false;
  }

  return true;
};

export default isAuth;
