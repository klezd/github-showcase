import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';

import LogoutIcon from '@mui/icons-material/Logout';
import Fab from '@mui/material/Fab';

import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import SearchIcon from '@mui/icons-material/Search';

import styles from './styles.module.css';

import HideOnScroll from "./HideOnScroll";
import ScrollTo from "./ScrollTo";

import HeadingPart from "./Heading";
import RepoItemCard from './../Repos/RepoItemCard';

import { setUserLogged, 
  getUserInfo, 
  unauthorizeUser, 
  getUserData 
} from "../../store/action";

import Loading from "../Loading/Loading";

function Home(props) {
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logStatRedux = useSelector(s=> s.isLoggedin);
  const data = useSelector(s=> s.userData);
  const loggedAs = useSelector(s => s.userLogged);
  const userRepos = useSelector(s=> s.userRepos);
  const userCont = useSelector(s=> s.userCont);
  const loading = useSelector(s => s.isLoadingData);
  const error = useSelector(s => s.errorLoadData)

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
      dispatch(getUserData());
    }
  }, [loginuser, dispatch]);

  const logout = () => {
    dispatch(unauthorizeUser())
  }

  const getOtherInfo = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(getUserInfo(name));
    document.getElementById("back-to-top-anchor").scrollIntoView({ behavior: 'smooth' });
  }

  const handleChange = (event) => {
    console.log(event.target.value)
    setName(event.target.value);
  };

  return (
    <div className={styles.root}>
      <HideOnScroll {...props}>
        <AppBar>
          <Toolbar className={styles.appbar}>
            <Typography variant="h6" component="div">
              What behinds a git profile?
            </Typography>

            <div className={styles.appBtn}>
              <ScrollTo {...props} idTo="search-box" autoShown setPos={false}>
                <PersonSearchIcon />
              </ScrollTo>
              <div onClick={logout}>
                <LogoutIcon/>
              </div>
            </div>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <Toolbar id="back-to-top-anchor" />
      
      <Container maxWidth="lg" className={styles.container}>
        <Box className={styles.background}></Box>
        <Box className={styles.heading}>
          <HeadingPart data={data} loggedAs={loggedAs} />
        </Box>

        {loading && (
          <Loading />
        )}
        
        {error.length === 0 && !loading && (
          <>
            {userRepos.length !== 0  && <Box className={styles.reposList}>
              <Typography variant="h5" component="div">Public Repositories</Typography>
              <div className={styles.content}>
                {userRepos.length !== 0 && userRepos.map((repo, index) => {
                  const {id} = repo;
                  return (
                    <RepoItemCard key={`repo_${id}_${index}`} repo={repo} />
                  )
                })}
              </div>
            </Box>}
            {userCont.length !== 0 && <Box className={styles.contributions}>
              <Typography variant="h5" component="div">History of Contribute</Typography>          
            </Box>}
          </>
        )}

        {error.length !== 0 && (
          <Box styles={{display: 'flex', justifyContent: "center", alignItems: "center"}}>
            {error}
          </Box>
        )}        

      </Container>

      <Toolbar id="search-box"></Toolbar>

      <Container maxWidth="lg" className={styles.container}>
        <Box styles={{display: 'flex', justifyContent: "center", alignItems: "center", paddingBottom: "40px"}}>
          <Typography variant="h5" component="div">View Other Profile ?</Typography>
          <Paper
            component="form"
            className={styles.search}
            onSubmit={getOtherInfo}
          >
            <InputBase
              id="Github-uname"
              value={name}
              onChange={handleChange}
              sx={{ ml: 1, flex: 1 }}
              placeholder="Github Username"
              inputProps={{ 'aria-label': 'Search Github Username' }}
            />
            <IconButton 
              color="primary" 
              aria-label="search" 
              sx={{ p: '10px' }} 
              component="span" 
              size="large"
              type="submit"
            >
              <SearchIcon />
            </IconButton>
          </Paper>
        </Box>

      </Container>

      <ScrollTo {...props} idTo="back-to-top-anchor">
        <Fab color="primary" size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTo>

    </div>
  );
}

export default Home;
