import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import { useContext } from "react";
import { FunctionContext } from "../../context/FormContext";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

    const {  changeContext } = useContext(FunctionContext);
  
  function handleClick(){
    changeContext('Create a New Spot');
  }

  return (
    <ul id="nav-ul">
      <li>
        
        <NavLink to="/"><img id="logo" src='https://cdn.dribbble.com/users/4220912/screenshots/20164211/media/cc31547f3acfdeb511f4ea36b542f576.jpg?resize=400x300&vertical=center' /> </ NavLink>
      </li>
      {isLoaded && (
        <li >
          {sessionUser && <NavLink id="create-spot" to='/spots/new' onClick={handleClick}>Create a New Spot</NavLink>}
          <ProfileButton user={sessionUser} />
        </li>
      )}
    </ul>
  );
}

export default Navigation;
