import React, {useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';

import LogoutIcon from '@mui/icons-material/Logout';
import Fab from '@mui/material/Fab';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import styles from './styles.module.css';

import HideOnScroll from "./HideOnScroll";
import ScrollTop from "./ScrollTop";

import { setUserLogged, getUserInfo, getUserRepos, unauthorizeUser } from "../../store/action";

function Home(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logStatRedux = useSelector(s=> s.isLoggedin);
  const data = useSelector(s=> s.userData);

  const isLoggedIn = localStorage.getItem("isLoggedIn") 
      ? localStorage.getItem("isLoggedIn") === "true" && true
      : logStatRedux;
  
  const loginuser = Object.keys(data).length !== 0 ? data.userlogin : "";
  useEffect(() => {
    if(!isLoggedIn) {
      navigate('/auth')
    } else {
      dispatch(setUserLogged());
      dispatch(getUserInfo());
    }
  }, [isLoggedIn, navigate, dispatch]);

  useEffect(() => {
    if(loginuser) {
      dispatch(getUserRepos());
    }
  }, [loginuser, dispatch]);

  const logout = () => {
    dispatch(unauthorizeUser())
  }

  const openGithub = () => {
    window.open(data.userurl, "_blank")
  }

  return (
    <div className={styles.root}>
      <HideOnScroll {...props}>
        <AppBar>
          <Toolbar className={styles.appbar}>
            <Typography variant="h6" component="div">
              What behinds a git profile?
            </Typography>
            <div onClick={logout}>
              <LogoutIcon/>
            </div>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <Toolbar />
      
      <Container maxWidth="md" className={styles.container}>
        <Box className={styles.background}></Box>
        <Box className={styles.heading}>
          <div className={styles.image}>
            <img src={data.useravatar} alt={data.userlogin}></img>
          </div>
          <div className={styles.title}>
            <div>
              <Tooltip title={data.userlogin}>
                <div className={styles.name} onClick={openGithub}>{data.username}</div>
              </Tooltip>
              <span>User logged as &nbsp;
                <strong>{data.userlogin}</strong>
              </span>
              <br />
              <span>{data.useremail}</span>
            </div>
            <div className={styles.indexData}>
              {data.userindex && Object.keys(data.userindex).length !== 0 && Object.keys(data.userindex).map((idx, inum) => (
                <span key={`index_${idx}_${inum}`} id={`index_${idx}_${inum}`} className={styles.indexline}>
                  {idx.replaceAll("_", " ")}: &nbsp; <span>{data.userindex[idx]}</span>
                  <br />
                </span>
              ))}
            </div>
          </div>
        </Box>
        <Box className={styles.content}></Box>
      </Container>

      <ScrollTop {...props}>
        <Fab color="secondary" size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>

    </div>
  );
}

export default Home;
