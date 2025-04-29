import { useEffect, useRef, useState } from "react";
import { useNavigate, Link } from "react-router";
import { ToastContainer, toast, Bounce } from "react-toastify";

import { useAuth } from "../../context/authContext";
import style from "./Sign.module.css";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { signUp, error, setError } = useAuth();
  const navigate = useNavigate();
  const nameRef = useRef(null);

  useEffect(() => {
    nameRef.current.focus();
  }, []);

  useEffect(() => {
    if (error) {
      const toastId = toast.error(error, {
        onClose: () => setError(null),
      });
      return () => toast.dismiss(toastId);
    }
  }, [error, setError]);

  const handleSignUp = async () => {
    if (loading) return;
    setLoading(true);

    const success = await signUp(email, password);
    setLoading(false);
    if (success) {
      setEmail("");
      setPassword("");
      navigate("/");
    }
  };

  return (
    <div className={style.container}>
      <div className={style.innerContainer}>
        <h1 className={style.heading}>Sign Up</h1>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={style.input}
          ref={nameRef}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={style.input}
          onKeyDown={(e) => e.key === "Enter" && handleSignUp()}
        />
        <div className={style.buttons}>
          <button className={style.button} onClick={handleSignUp}>
            Sign Up
          </button>
        </div>
        <Link to="/signin">
          <h2 className={style.signup}>Already registered? Sign In Now</h2>
        </Link>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={true}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />
    </div>
  );
};

export default SignUp;
