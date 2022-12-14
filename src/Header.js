import React  from "react";
import { NavLink,  useLocation } from "react-router-dom";
import { logOut, useAuthDispatch } from "./Context";
// class Header extends Component {
const Header = () => {
  const location = useLocation();
  console.log(location.pathname);
  // logout
  const dispatch = useAuthDispatch();
  
  const handleLogout = async () => {
    try {
      let response = await logOut(dispatch);
      console.log(response);
      // props.history.push("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return location.pathname !== "/login" ? (
    // <YourNavBarComponents />
    <nav className="main-menu">
      <ul>
        <li>
          <NavLink to="/prform">PrForm</NavLink>
        </li>
        <li>
          <NavLink to="/poform">PoForm</NavLink>
        </li>
        <li>
          <NavLink to="/about">About</NavLink>
        </li>
        <li>
          <NavLink to="/inbox">收件匣</NavLink>
        </li>
        <li>
          <NavLink to="/about">寄件匣</NavLink>
        </li>


        <li>
          <a onClick={handleLogout}>LOGOUT</a>
        </li>
      </ul>
    </nav>
  ) : null;
};

export default Header;
