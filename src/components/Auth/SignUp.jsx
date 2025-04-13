import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router";
import { ToastContainer, toast, Bounce } from "react-toastify";

import { useAuth } from "../../context/authContext";
import style from "./Sign.module.css";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signUp, error, setError } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      toast.error(error);
      const timeout = setTimeout(() => setError(null), 2500); // let toast settle
      return () => clearTimeout(timeout); // clean up
    }
  }, [error]);

  useEffect(() => {
    return () => {
      setError(null); // clean up on unmount
    };
  }, []);

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
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={style.input}
        />
        <div className={style.buttons}>
          <button
            className={style.button}
            onClick={async () => {
              const success = await signUp(email, password);
              if (success) {
                setEmail("");
                setPassword("");
                navigate("/");
              }
            }}
          >
            Sign Up
          </button>
        </div>
        <Link to="/signin">
          <h2 className={style.signup}>Already registered? Sign In</h2>
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
