import { publicRequest } from '../../requestMethods'
import { handleError, handleSuccess } from '../toast'
import {
  loginFailure,
  loginStart,
  loginSuccess,
  logout,
} from '../../components/redux/userRedux';

// validate format and data

export const validateUsername = (username, setError, setUsername) => {
  // Comprueba la validez del nombre de usuario y actualiza los estados de error y nombre de usuario
  if (username.length === 0 || username.length < 3) {
    setError('username');
  } else {
    setError('');
    setUsername(username);
  }
};

export const validatePassword = (
  password,
  setError,
  setPassword,
  setStore,
  login,
  setOff,
) => {
  // Comprueba la validez de la contraseña y realiza las acciones correspondientes
  if (password.length === 1 || password.length < 8) {
    setError('password');
    login ? setOff(false) : ''; // enciende el boton
  } else {
    setError('');
    setPassword(password);
    setStore(password);
  }
};

export const matchPasswords = (confirmPassword, setError, setOff, store) => {
  // Comprueba si las contraseñas coinciden
  if (store !== confirmPassword) {
    setError('confirmPassword'); // arroja un error en el formulario
    setOff(true); // apaga el boton de envio
  } else {
    setError('');
    setOff(false); // enciende el boton de envio
  }
};

export const verifyEmail = (email, setError, setEmail) => {
  // Verifica la validez del correo electrónico y realiza las acciones correspondientes
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    setError('email');
  } else {
    setError('');
    setEmail(email);
  }
};

export const findByEmail = async (email) => {
  try {
    const res = await publicRequest.post('/users/findByEmail', {
      email,
    });
    return res;
  } catch (error) {
    console.log(error);
    handleError(error);
  }
};

// functionals functions

// Register a user
export const handleRegistration = async (email, password, username, setMsg) => {
  // Make the registration request and manage the responses.
  console.log(email + ' email', password + ' password', username + ' username');
  try {
    await publicRequest.post('/users/signUp', {
      email,
      password,
      username,
    });
    handleSuccess('created');
    setMsg('created');
  } catch (error) {
    setMsg(error.message);
    console.log(error);
    handleError(error);
    setMsg('');
  }
};

// Log in
export const login = async (dispatch, email, password, setMsg) => {
  // Make the login request and handle the corresponding responses and errors
  setMsg('login');
  dispatch(loginStart());
  const time = 48 * 60 * 60 * 1000;
  try {
    const res = await publicRequest.post('/users/signIn', { email, password });
    dispatch(loginSuccess(res.data)); // use redux to log in the user
    handleSuccess('welcome');
    setTimeout(() => {
      logoutUser(dispatch);
    }, time);
  } catch (error) {
    setMsg(error.message);
    console.log(error);
    handleError(error);
    dispatch(loginFailure()); // cancel the action
  }
};

// google auth
export const googleLogin = async (token) => {
  try {
    const res = await publicRequest.get(`/users/google/signIn/${token}`);
    return res.data;
  } catch (error) {
    console.log(error);
    handleError(error);
  }
};

export const logoutUser = (dispatch) => {
  // Log out the user
  try {
    dispatch(logout());
    handleSuccess('logout');
  } catch (error) {
    console.log(error);
    handleError(error);
  }
};
