import { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [disabled, setDisabled] = useState();
  const { closeModal } = useModal();

  useEffect(() => {
    // set disabled to the inverse of credential being less than 4 chars
    // and the password being less than 6
    setDisabled(credential.length < 4 || password.length < 6);
  }, [credential, password]);

  const handleDemoSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(sessionActions.login({ credential: "FakeUser1", password: "password2" }))
      .then(() => {
        setErrors({});
        closeModal();
      })
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          console.log(data);
          setErrors(data.errors);
        }
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(sessionActions.login({ credential, password }))
      .then(() => {
        setErrors({});
        closeModal();
      })
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          console.log(data);
          setErrors(data.errors);
        }
      });
  };

  return (
    <>
      <div className="log-in">
        <h1>Log In</h1>
        <label>
          Username or Email
          <input
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {errors.message ? <p>The provided credentials were invalid</p> : ""}
        <button type="submit" onClick={handleSubmit} disabled={disabled}>
          Log In
        </button>
        <button type="submit" onClick={handleDemoSubmit}>Log In As Demo User</button>
      </div>
    </>
  );
}

export default LoginFormModal;
