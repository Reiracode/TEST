import React from "react";
// import { Route, Redirect } from "react-router-dom";
import { Route, Navigate, Outlet } from "react-router-dom";
import { useAuthState } from "./Context";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const userDetails = useAuthState();
  // console.log(userDetails.IsLogin);
  // console.log(userDetails);
  // console.log({ ...rest });

  return userDetails.IsLogin ? <Outlet /> : <Navigate to="/login" />

  // return (
  //   <Route
  //     {...rest}
  //     render={(routeProps) => {
  //       return userDetails.IsLogin ? (
  //         <Component {...routeProps} />
  //       ) : (
  //           <Navigate to="/login" />
  //       );
  //     }}
  //   />
  // );


};

export default PrivateRoute;
