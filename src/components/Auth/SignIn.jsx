import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { ToastContainer, toast, Bounce } from "react-toastify";

import { useAuth } from "../../context/authContext";
import style from "./Sign.module.css";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signIn, error, setError } = useAuth();
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
        <h1 className={style.heading}>Sign in</h1>
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
              const success = await signIn(email, password);
              if (success) {
                setEmail("");
                setPassword("");
                navigate("/");
              }
            }}
          >
            Sign In
          </button>
        </div>
        <Link to="/signup">
          <h2 className={style.signup}>Not Signed Up yet?</h2>
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

export default SignIn;
