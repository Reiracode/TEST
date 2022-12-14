// AuthReducer 管理狀態及改變，根據(initialState, action)
// 定義reducer(lState, action)
// 參數state: 當前的initialState
// 參數action: 子元素傳來的參數
// 回傳值: 新的state的值。==>改變後的
// login的狀態:userno IsLogin

// define inital state,and return new state
let userno = localStorage.getItem("currentUser")
  ? JSON.parse(localStorage.getItem("currentUser")).userno
  : "";

let dep = localStorage.getItem("currentUser")
  ? JSON.parse(localStorage.getItem("currentUser")).dep
  : "";

let IsLogin = localStorage.getItem("currentUser")
  ? JSON.parse(localStorage.getItem("currentUser")).IsLogin
  : "";

// let userno = localStorage.getItem("currentUser") ? "000002" : "";
// let IsLogin = localStorage.getItem("currentUser") ? "true" : "";

export const initialState = {
  userno: "" || userno,
  IsLogin: false || IsLogin,
  loading: false,
  errorMessage: null,
  dep: "" || dep,
};

export const AuthReducer = (initialState, action) => {
  // console.log(action.payload)
  switch (action.type) {
    case "REQUEST_LOGIN":
      return {
        ...initialState,
        loading: true,
      };
    case "LOGIN_SUCCESS":
      return {
        ...initialState,
        userno: action.payload.userno,
        dep: action.payload.dep,
        IsLogin: action.payload.IsLogin,
        loading: false,
      };
    case "LOGOUT":
      return {
        ...initialState,
        user: "",
        IsLogin: false,
      };
    case "LOGIN_ERROR":
      return {
        ...initialState,
        loading: false,
        errorMessage: action.error,
      };
    
    
    
    case "REQUEST_CREATE":
      return {
        ...initialState,
        loading: true,
      };
    case "CREATE_SUCCESS":
      return {
        ...initialState,
        userno: action.payload.userno,
        dep: action.payload.dep,
        IsLogin: true,
        loading: true,
      };
    case "CREATE_ERROR":
      return {
        ...initialState,
        loading: false,
        errorMessage: action.error,
      };
    
    
    
    
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};
