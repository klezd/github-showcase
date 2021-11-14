import React from "react";

import Tooltip from '@mui/material/Tooltip';

import styles from './styles.module.css';

function HeadingPart(props) {

  const {data, loggedAs} = props;

  const openLink = (link) => {
    window.open(link, "_blank")
  }

  console.log(loggedAs)
  console.log(data.userlogin)
  console.log(loggedAs === data.userlogin)
  console.log(loggedAs == data.userlogin)

  return (
    <React.Fragment>
      <div className={styles.image}>
        <img src={data.useravatar} alt={data.userlogin}></img>
      </div>
      <div className={styles.title}>
        <div>
          <Tooltip title={data.userlogin}>
            <div className={styles.name} onClick={() => openLink(data.userurl)}>{data.username}</div>
          </Tooltip>
          {loggedAs === data.userlogin ? (
            <span>User logged as &nbsp;
              <strong>{loggedAs}</strong>
            </span>
          ) : (
            <span>Viewing &nbsp;
              <strong>{data.userlogin}</strong>
            </span>
          )}
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
    </React.Fragment>
  );
}

export default HeadingPart;
