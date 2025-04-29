import React from "react";
import { useLocation, useNavigate } from "react-router";

import style from "./Page404.module.css";

function Page404() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className={style.container}>
      <h1 className={style.heading}>
        4<span className={style.zero}>0</span>4
      </h1>
      <h2 className={style.message}>Page Not Found</h2>
      <p className={style.info}>
        The page <code>{location.pathname}</code> does not exist.
      </p>
      <button className={style.backButton}
        onClick={() => {
          navigate("/");
        }}
      >
        Go to Home
      </button>
    </div>
  );
}

export default Page404;
