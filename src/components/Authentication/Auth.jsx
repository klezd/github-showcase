import React, {useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import Button from '@mui/material/Button';
import GitHubIcon from '@mui/icons-material/GitHub';
import styles from './styles.module.css';

import { loginGithub } from "../../store/action";

function Authentication() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logStatRedux = useSelector(s=> s.isLoggedin);

  const isLoggedIn = localStorage.getItem("isLoggedIn") 
      ? localStorage.getItem("isLoggedIn") === "true" && true
      : logStatRedux;
    
  useEffect(() => {
    if (isLoggedIn){
      console.log(' User Logged in')
      navigate('/home')
    }
  }, [isLoggedIn, navigate]);

  const loginWithGithub = () => {
    dispatch(loginGithub())
  }

  return (
    <div className={styles.root}>
      <div className={styles.loginForm}>
        <div>
         <h2>Welcome!</h2> 
          <p>
            You need to get authenticated before exploring the showcase
          </p>
        </div>
        <Button 
          variant="outlined" 
          className={styles.button}
          onClick={loginWithGithub}
        >
          <GitHubIcon /> <span>&nbsp;</span>
          Login With Github
        </Button>
      </div>
    </div>
  );
}

export default Authentication;
