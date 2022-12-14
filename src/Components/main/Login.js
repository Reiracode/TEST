import React, { useState, Fragment } from "react";
import { Navigate, useNavigate } from "react-router-dom";
//globe state
import { loginUser, createUser, useAuthState, useAuthDispatch } from "../../Context";

const Login = () => {
  let navigate = useNavigate();
  const [show, setShow] = useState(false);
  const setOn = () => {
    setShow(!show);
  };

  // const newStyle = show ? "display-block" : "display-none";
  const newStyle = show ? "v_v" : "v_h";

  const cardStyle = {
    height: show ? 0 : "250px",
    opacity: show ? 0 : 1,
    transition: "all .5s ease-in"
  };

  const cardStylea = {
    opacity: show ? 1 : 0,
    height: show ? "250px" : 0,
    transition: "all .5s ease-in",
  };

  //globe state ex:loginUser(dispatch, formList);
  const dispatch = useAuthDispatch();
  const { errorMessage, IsLogin } = useAuthState();
  // login err msg
  const initalMsg = { messclass: "alert alert-danger", message: " " };

  // login
  const formInitial = { email: "", password: "" };
  const [formList, setFormList] = useState(formInitial);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormList({ ...formList, [name]: value });
  };

  const handleLogin = async (e) => {
    console.log("handleLogin");
    e.preventDefault();
    try {
      const response = await loginUser(dispatch, formList);
      console.log(response)
      if (response == undefined) return;
      if (!response.token) return;
      // props.history.push("/about");
      navigate('/about')
    } catch (error) {
      console.log(error);
    }
  };

  // register
  const regformInitial = { remail: "", rpassword: "" };
  const [regformList, setregFormList] = useState(regformInitial);
  const handleresInputChange = (e) => {
    const { name, value } = e.target;
    // setregFormList({ ...regformList, [name]: value });
    setregFormList({ ...regformList, [name]: value });
  };

  const handleRegister = async (e) => {
    console.log("handleRegister");
    e.preventDefault();
    try {
      // const response = await createUser(dispatch, regformList);
      const newregformList = { email: regformList.remail, password: regformList.rpassword };
      const response = await createUser(dispatch, newregformList);
      console.log(response)
      if (response == undefined) return;
      navigate('/prform')
    } catch (error) {
      console.log(error);
    }

  };

  return (
    <>
      {IsLogin ? (
        <Navigate to="/PrForm" />
        // <Navigate to="/Reiraapp/PrForm" />
      ) : (
        <div className="login_form">
          <Fragment>
              <div className="form">
                {/* REGISTER */}
              <form
                style={cardStylea}
                className={"flip-card register-form " + newStyle}
                id="myForm1"
              >
                  <input
                    type="text"
                    id="remail"
                    name="remail"
                    value={regformList.remail}
                    onChange={handleresInputChange}
                    placeholder="email"
                  />

                  <input
                    type="password"
                    id="rpassword"
                    name="rpassword"
                    value={regformList.rpassword}
                    onChange={handleresInputChange}
                    placeholder="password"
                  />
 

                <button
                  type="button"
                  className="btn btn-primary register_btn"
                  onClick={handleRegister}
                >
                  create
                </button>

                <p className="message">
                  Already registered?
                  <a href="#" onClick={setOn}>
                    Sign In
                  </a>
                  </p>
                  {errorMessage ? (
                    <p className={initalMsg.messclass}>{errorMessage}</p>
                  ) : null}
              </form>

                {/* LOGIN */}
              <form style={cardStyle}>
                  <input
                    type="text"
                    id="email"
                    name="email"
                    placeholder="email"
                    value={formList.email}
                    onChange={handleInputChange}
                  />
        
                  <input
                    type="password"
                    name="password"
                    placeholder="password"
                    value={formList.password}
                    onChange={handleInputChange}
                  />

                <button
                  id="login_btn"
                  type="button"
                  className="btn btn-primary login_btn"
                  onClick={handleLogin}
                >
                  login
                </button>

                <p className="message">
                  Not registered?{" "}
                  <a href="#" onClick={setOn}>
                    Create an account
                  </a>
                </p>

    
                {errorMessage ? (
                  <p className={initalMsg.messclass}>{errorMessage}</p>
                ) : null}
              </form>
            </div>
          </Fragment>
        </div>
      )}
    </>
  );
};
export default Login;
