import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import { useState } from "react";
import "./Navigation.css";
import Logo from "../../assets/home.jpg";
import { useContext } from "react";
import { FunctionContext } from "../../context/FormContext";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

    const { formType, changeContext } = useContext(FunctionContext);
  
  function handleClick(){
    changeContext('Create a New Spot');
  }

  return (
    <ul id="nav-ul">
      <li>
        
        <NavLink to="/"><img id="logo" src={Logo} /> </ NavLink>
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
