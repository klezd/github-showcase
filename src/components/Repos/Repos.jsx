import React, {useEffect} from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import styles from './styles.module.css';


function Repos() {
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();

  const {name, id} = params;
    
  useEffect(() => {
  }, []);


  return (
    <div className={styles.root}>
      
    </div>
  );
}

export default Repos;
