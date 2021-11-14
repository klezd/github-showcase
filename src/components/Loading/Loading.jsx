import React from "react";

import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import HourglassFullIcon from '@mui/icons-material/HourglassFull';

import styles from './styles.module.css';


function Loading() {
  return (
    <div className={styles.root}>
      <div className={styles.loadingObj}>
        <HourglassFullIcon  id="fullHg" className={styles.fullHg} />
        <HourglassEmptyIcon id="emptyHg" className={styles.emptyHg} />
      </div>
    </div>
  );
}

export default Loading;
