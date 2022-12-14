import React from 'react';
import Banner from './banner';
// import "./views.css"
import { Outlet } from "react-router-dom";

function MainView() {

  //react-router is so cool what the hell
  return (
    <div className="mainView">
      <Banner />
      <Outlet />
    </div>
  );
}

export default MainView;