import React, {useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import styles from './styles.module.css';

function Home() {
  const navigate = useNavigate();
  const logStatRedux = useSelector(s=> s.isLoggedin);

  const isLoggedIn = localStorage.getItem("isLoggedIn") 
      ? localStorage.getItem("isLoggedIn") === "true" && true
      : logStatRedux;
  
  useEffect(() => {
    if(!isLoggedIn) {
      console.log(' User Not Logged in')

      navigate('/auth')
    }
  }, [isLoggedIn, navigate]);

  return (
    <div className={styles.root}>
      Home
    </div>
  );
}

export default Home;
