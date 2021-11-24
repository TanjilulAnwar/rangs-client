import React from "react";
import {useHistory} from 'react-router-dom';
import axios from '../api';

var UserStateContext = React.createContext();
var UserDispatchContext = React.createContext();

function userReducer(state, action) {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return { ...state, isAuthenticated: true, userInfo: action.user_info?action.user_info:{} };
    case "SIGN_OUT_SUCCESS":
      return { ...state, isAuthenticated: false, userInfo: {} };
    case "USER_INFO":
      return { ...state, userInfo: action.user_info };
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function UserProvider({ children }) {                       // startup user check
  const history = useHistory()
  const [loading, setLoading] = React.useState(true)
  var [state, dispatch] = React.useReducer(userReducer, {
    isAuthenticated: false,
  });

  React.useEffect(()=>{
    const token = localStorage.getItem('user-token')
    if(token){
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      axios.get('/Verify/Token')
        .then(resp=>{
          if(resp.data.success){
            dispatch({ type: 'LOGIN_SUCCESS', user_info: resp.data.message })
          } 
        })
        .finally(()=>setLoading(false))
    } else setLoading(false)
  }, [history])

  return (
    !loading
      ? <UserStateContext.Provider value={state}>
          <UserDispatchContext.Provider value={dispatch}>
            {children}
          </UserDispatchContext.Provider>
        </UserStateContext.Provider>
      : <h2>Loading...</h2>
  );
}

function useUserState() {
  var context = React.useContext(UserStateContext);
  if (context === undefined) {
    throw new Error("useUserState must be used within a UserProvider");
  }
  return context;
}

function useUserDispatch() {
  var context = React.useContext(UserDispatchContext);
  if (context === undefined) {
    throw new Error("useUserDispatch must be used within a UserProvider");
  }
  return context;
}
// eslint-disable-next-line
export { UserProvider, useUserState, useUserDispatch };


// ////////////////////////////////////  Multi tab authentication (Auto login/logout)

// let user_token = sessionStorage.getItem('user-token');
// if(!user_token){
//   localStorage.setItem('NEW_TAB', Date.now())         // Ask other tabs for session storage value
// }

// window.addEventListener('storage', (e)=>{
//   const user_token = sessionStorage.getItem('user-token');
//   if(e.key === 'NEW_TAB' && user_token){              // Share session storage
//     localStorage.setItem('SESSION', user_token)
//     localStorage.removeItem('SESSION')
//   } else if(e.key === 'SESSION' && e.newValue) {      // Set session to new tab
//     if(!user_token){
//       sessionStorage.setItem('user-token', e.newValue)
//       try{
//         const state = window.history.state.state
//         window.location.replace(state ? state.from.pathname : '/')
//       } catch {}
//     }
//   } else if(e.key === 'LOGOUT') {                     // Logout from all tab
//     sessionStorage.clear()
//     localStorage.clear()
//     window.location.href = '/login';
//   }
// })

// window.onbeforeunload = (event) => {
//   localStorage.clear();
// }
