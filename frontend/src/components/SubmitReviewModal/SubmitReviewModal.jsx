import { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "../LoginFormModal/LoginForm.css";

function SubmitReviewModal() {
  const dispatch = useDispatch();
  const [review, setReview] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setErrors({});
//     return dispatch(sessionActions.login({ credential, password }))
//       .then(closeModal)
//       .catch(async (res) => {
//         const data = await res.json();
//         if (data && data.errors) {
//           setErrors(data.errors);
//         }
//       });
//   };

  const MODAL_STYLES = {
    zIndex: 1000,
    width: "500px",
    backgroundColor: "red"
  }


  return (
    <div style={MODAL_STYLES}>
      <form style={MODAL_STYLES}>
        <h1>How was your stay?</h1>
        <label>
          <input
            type="text"
            value={review}
            onChange={(e) => setReview(e.target.value)}
            required
          />
        </label>

        <button type="submit">Log In</button>
      </form>
    </div>
  );
}

export default SubmitReviewModal;
