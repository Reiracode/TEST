import React, { createContext, useContext, useReducer } from "react";
import { initialState, AuthReducer } from './reducer';

// Context: 1、createContext，建立global state
//          2、useContext     讀取context  
// 建立Provider 包住想傳遞的子元件

// 1' useAuthState : 判斷登入狀態的Context{ errorMessage, IsLogin } 
// 2' useAuthDispatch: 
// const dispatch = useAuthDispatch();
// fetch api user資料 await loginUser(dispatch, formList)
// 3' AuthProvider;

// 1 useAuthState:登入狀態的Context
//   userno: "" || userno,
//   IsLogin: false || IsLogin,
//   loading: false,
//   errorMessage: null,
const AuthStateContext = createContext();
export function useAuthState() {
  const context = useContext(AuthStateContext);
  if (context === undefined) {
    throw new Error(
      "useAuthState must be used within a AuthStateContext Provider");
  }
  return context;
}

//2 useAuthDispatch:login/logout
//  使用方式 const dispatch = useAuthDispatch();
//   const handleLogout = async () => {
//   let response = await logOut(dispatch);
const AuthDispatchContext = createContext();
export function useAuthDispatch() {
  const context = useContext(AuthDispatchContext);
  if (context === undefined) {
    throw new Error(
      "useAuthDispatch must be used within a AuthDispatchContext Provider"
    );
  }

  return context;
}

//private router
//使用Context的方法是使用<名稱.Provider value={state值}>
//把你想要允許可以讀取這個context的子元素階層包起來 
// AuthProvider 父元素使用context:用 AuthStateContext

//最外一層：規劃login true 才能使用各routes
//最外第二層：login true，才能使用各個dispatch

//引入useReducer，取得state和dispatch。 useReducer(reducer函式, state的初始值);
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, initialState);
                    // AuthReducer = (initialState, action);
  return (
    <AuthStateContext.Provider value={state}>
      <AuthDispatchContext.Provider value={dispatch}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthStateContext.Provider>
  );
};
