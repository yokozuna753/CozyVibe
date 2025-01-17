import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import * as sessionActions from "../../store/session";
import OpenModalMenuItem from "./OpenModalMenuItem";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import { NavLink } from "react-router-dom";

function ProfileButton({ user }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const toggleMenu = (e) => {
    e.stopPropagation(); // Keep from bubbling up to document and triggering closeMenu
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    closeMenu();
    navigate('/');
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  return (
    <>
    <div id="profile">

      <button id="profile-button" onClick={toggleMenu}>
        <FaUserCircle />
      </button>
      <ul className={ulClassName} ref={ulRef}>
        {user ? (
          <div>
            <div id="profile-info">
              <li>Hello, {user.firstName}</li>
              <li>{user.email}</li>
            </div>
            <div id="user-info">
              <NavLink to='/spots/current'><li>Manage Spots</li></NavLink>
            </div>
            <li>
              <button onClick={logout}>Log Out</button>
            </li>
          </div>
        ) : (
          <>
          <div id="log-button1">
            <OpenModalMenuItem
              itemText="Log In"
              onItemClick={closeMenu}
              modalComponent={<LoginFormModal />}
              />
            </div>
            <div id="log-button1">
            <OpenModalMenuItem
              itemText="Sign Up"
              onItemClick={closeMenu}
              modalComponent={<SignupFormModal />}
              />
          </div>
              </>
        )}
      </ul>
        </div>
    </>
  );
}

export default ProfileButton;
