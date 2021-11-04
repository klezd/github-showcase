import React, {useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import styles from './styles.module.css';

function Home() {
  const navigate = useNavigate();
  const isLoggedIn = useSelector(s=> s.isLoggedin);
  
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
