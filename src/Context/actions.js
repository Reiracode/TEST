import Singleton from "../Singleton";
import axios from "axios";
//真正去api取資料，再進行後續動作


export async function loginUser(dispatch, loginPayload) {
  const ROOT_URL = `https://reqres.in/api/login`;
  console.log(loginPayload);
    try {
      dispatch({ type: "REQUEST_LOGIN" });
      //way2==============================
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginPayload),
      };
      let response = await fetch(`${ROOT_URL}`, requestOptions);
      let data = await response.json();
      console.log(data);
     // ==============================
      //模擬api 取得{token: 'QpwL5tke4Pnpja7X4'}後，有user資料
      if (data.token) { 
          const logindata = { userno: "000002", dep: "資訊技術部", IsLogin: "true", loading: false }
          dispatch({ type: "LOGIN_SUCCESS", payload: logindata });
          localStorage.setItem("currentUser", JSON.stringify(logindata));
          return logindata;
      } 

      dispatch({ type: "LOGIN_ERROR", error: data.error});
      return;

    } catch (error) {
      dispatch({ type: "LOGIN_ERROR", error: error });
    }

}

export async function createUser(dispatch, loginPayload) {
  // const ROOT_URL = `https://reqres.in/api/users`;
  const ROOT_URL = `https://reqres.in/api/register`;
  try {
    dispatch({ type: "REQUEST_CREATE" });
    console.log(loginPayload)
    //way2==============================
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginPayload),
    };
    let response = await fetch(`${ROOT_URL}`, requestOptions);
    let data = await response.json();
    console.log(data)//"id": 4 "token": "QpwL5tke4Pnpja7X4"
    // ==============================
    if (data.id) {
      const logindata = { userno: data.id, dep: "行政管理處", IsLogin: "true", loading: false }
      dispatch({ type: "CREATE_SUCCESS", payload: logindata });
      localStorage.setItem("currentUser", JSON.stringify(logindata));
      return logindata;
    }

    dispatch({ type: "CREATE_ERROR", error: data.error });
    return;

  } catch (error) {
    dispatch({ type: "CREATE_ERROR", error: error });
  }

}

export async function logOut(dispatch) {
  dispatch({ type: "LOGOUT" });
  localStorage.removeItem("currentUser");
  localStorage.removeItem("token");
}
