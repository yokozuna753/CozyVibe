import { useState, useEffect, useRef } from "react";
import OpenModalMenuItem from "../OpenModalButton";


import DeleteReviewModal from "../DeleteReviewModal/DeleteReviewModal";



function DeleteReviewButton({id}) {

  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

//   const toggleMenu = (e) => {
//     e.stopPropagation(); // Keep from bubbling up to document and triggering closeMenu
//     setShowMenu(!showMenu);
//   };



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

  return (
    <div className="review-delete">
      <OpenModalMenuItem
              itemText="Delete your Review"
              onItemClick={closeMenu}
              modalComponent={<DeleteReviewModal id={id} />}
              buttonText='Delete'
            />
    </div>
  );
}

export default DeleteReviewButton;
