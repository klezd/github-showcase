import React, {useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import styles from './styles.module.css';
import { initGithubAccessToken , unauthorizeUser} from "../../store/action";

function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logStatRedux = useSelector(s=> s.isLoggedin);

  const isLoggedIn = localStorage.getItem("isLoggedIn") 
      ? localStorage.getItem("isLoggedIn") === "true" && true
      : logStatRedux;
  
  useEffect(() => {
    if(!isLoggedIn) {
      console.log(' User Not Logged in')

      navigate('/auth')
    } else {
      dispatch(initGithubAccessToken())
    }
  }, [isLoggedIn, navigate, dispatch]);

  const logout = () => {
    dispatch(unauthorizeUser())
  }

  return (
    <div className={styles.root}>
      Home
      <div onClick={logout}>log out</div>
    </div>
  );
}

export default Home;
