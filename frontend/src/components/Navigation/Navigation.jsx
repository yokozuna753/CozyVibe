import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import Logo from "../../assets/home.jpg";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  return (
    <ul id="nav-ul">
      <li>
        
        <NavLink to="/"><img id="logo" src={Logo} /> </ NavLink>
      </li>
      {isLoaded && (
        <li >
          {sessionUser && <NavLink id="create-spot" to='/spots/new'>Create a New Spot</NavLink>}
          <ProfileButton user={sessionUser} />
        </li>
      )}
    </ul>
  );
}

export default Navigation;
