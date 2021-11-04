import React from "react";
import { useDispatch } from "react-redux";
import {useLocation } from 'react-router-dom'
import { getGithubAccessToken } from "../store/action";
import { getQueryParams } from "../utils";
import styles from './styles.module.css';

function LoginWithGithub() {
  const location = useLocation();
  const dispatch = useDispatch();
  // ?code=513cbac8a8cf78c9a86f&state=19109719972809
  const code = getQueryParams(location.search);
  
  console.log(code);

  React.useEffect(() => {
    if(code) {
      console.count('login get token')
      dispatch(getGithubAccessToken(code))
    }
  }, [dispatch, code]);

  return (
    <div className={styles.root}>
      Loading
    </div>
  );
}

export default LoginWithGithub;
