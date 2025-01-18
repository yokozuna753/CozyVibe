import { useState, useEffect, useRef } from "react";
import OpenModalMenuItem from "../OpenModalButton";
import SubmitReviewModal from "../SubmitReviewModal/SubmitReviewModal";
import './Reviews.css'



function PostReviewButton({id}) {

  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  // const toggleMenu = (e) => {
  //   e.stopPropagation(); // Keep from bubbling up to document and triggering closeMenu
  //   setShowMenu(!showMenu);
  // };

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
    <div className="post-review-button">
      <OpenModalMenuItem

              itemText="Post Your Review"
              onItemClick={closeMenu}
              modalComponent={<SubmitReviewModal id={id} />}
              buttonText='Post Your Review'
            />
    </div>
  );
}

export default PostReviewButton;
