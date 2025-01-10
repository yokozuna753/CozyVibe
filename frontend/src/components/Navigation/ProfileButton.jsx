


import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { FaUserCircle } from 'react-icons/fa';
import * as sessionActions from '../../store/session';

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const toggleMenu = (e) => {
    e.stopPropagation(); // Keep click from bubbling up to document and triggering closeMenu
    // if (!showMenu) setShowMenu(true);
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (ulRef.current && !ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener('click', closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  const ulClassName = "profile-dropdown" + (showMenu ? " profile-dropdown show" : "  profile-dropdown hidden");

  return (
    <nav className='nav'>
      <button id="user-nav" onClick={toggleMenu}>
        <FaUserCircle />
      </button>
      <ul className={ulClassName} ref={ulRef}>
        <li>{user.username}</li>
        <li>{user.firstName} {user.lastName}</li>
        <li>{user.email}</li>
        <li>
          <button id="logout" onClick={logout}>Log Out</button>
        </li>
      </ul>
    </nav>
  );
}

export default ProfileButton;






// import { useState, useEffect, useRef } from "react";
// import { useDispatch } from "react-redux";
// import { FaUserCircle } from "react-icons/fa";
// import * as sessionActions from "../../store/session";
// import { FaHouseChimneyUser } from "react-icons/fa6";
// import "./Navigation.css";

// function ProfileButton({ user }) {
//   const dispatch = useDispatch();

//   const [showMenu, setShowMenu] = useState(false);
//   const ulRef = useRef();

//   useEffect(() => {
//     if (!showMenu) return;


//     function closeMenu() {

//       if (ulRef.current && !ulRef.current.contains(e.target)) {
//       setShowMenu(false);
//     }
//     }
//     document.addEventListener("click", closeMenu);

//     return () => document.removeEventListener("click", closeMenu);
//   }, [showMenu]);

//   const toggleMenu = (e) => {
//     e.stopPropagation(); // Keep click from bubbling up to document and triggering closeMenu
//     setShowMenu(!showMenu);
//   };

//   const logout = (e) => {
//     e.preventDefault();
//     dispatch(sessionActions.logout());
//   };

//   return (
//     <nav className="nav">
//       <button id="user-nav" onClick={toggleMenu}>
//         <FaUserCircle />
//       </button>
//       <ul
//         className={
//           showMenu ? "profile-dropdown show" : " profile-dropdown hidden"
//         }
//         ref={ulRef}
//       >
//         <li>{user.username}</li>
//         <li>
//           {user.firstName} {user.lastName}
//         </li>
//         <li>{user.email}</li>
//         <li>
//           <button id="logout" onClick={logout}>
//             Log Out
//           </button>
//         </li>
//       </ul>
//     </nav>
//   );
// }

// export default ProfileButton;
