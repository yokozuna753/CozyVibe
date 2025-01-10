import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  const sessionLinks = sessionUser ? (
    <li className="nav">
      <ProfileButton user={sessionUser} />
    </li>
  ) : (
    <div className="nav">
      <li>
        <NavLink to="/login">Log In</NavLink>
      </li>
      <li>
        <NavLink to="/signup">Sign Up</NavLink>
      </li>
    </div>
  );

  return (
    <ul>
      <li>
        <NavLink to="/" id="home-button">Home</NavLink>
      </li>
      {isLoaded && sessionLinks}
    </ul>
  );
}

export default Navigation;
