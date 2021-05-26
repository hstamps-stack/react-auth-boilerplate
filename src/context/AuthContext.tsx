import React, { createContext, useReducer } from 'react';
import instance from '../api/apiConfig';

const initialState = {
  alert: '',
  loading: false,
  error: '',
  userLogin: () => {},
  userRegistration: () => {},
};

const authReducer = (state: any, action: any) => {
  switch (action.type) {
    case 'ALERT':
      return { ...state, alert: action.payload };
    case 'LOGIN':
      return { ...state, loading: false, error: '' };
    case 'REGISTER':
      return { ...state, loading: false, error: '' };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'ERROR':
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};

export const AuthContext = createContext<AuthStateType>(initialState);

export const AuthProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const userLogin = async (creds: Creds) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      let { data } = await instance.post('/auth/login', creds);
      localStorage.setItem('token', data.token);

      dispatch({ type: 'LOGIN' });
    } catch (e) {
      console.log(e);
      dispatch({ type: 'ERROR', payload: 'Email or password is incorrect!' });
    }
  };

  // Function for userRegistration

  const userRegistration = async (registerInfo:User) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      let { data } = await instance.post('/auth/register', registerInfo);
        console.log(data)
        
      dispatch({type: 'REGISTER'})
      dispatch({ type: 'ALERT' ,payload: "You have been successfully registered"});
     
    } catch (e) {
      console.log(e);
      dispatch({ type: 'ERROR', payload: "" });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        error: state.error,
        alert: state.alert,
        loading: state.loading,
        userLogin,
       userRegistration
      }}>
      {children}
    </AuthContext.Provider>
  );
};
