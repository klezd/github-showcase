import React from "react";

import Tooltip from '@mui/material/Tooltip';
import UpdateIcon from '@mui/icons-material/Update';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './styles.module.css';
import { compareDaysWithNow } from "../../utils/time";

function RepoItemCard(props) {

  const {repo} = props;
  const {name, html_url, size, description, updated_at, fork} = repo;

  const openLink = (link) => {
    window.open(link, "_blank")
  }

  return (
    <div className={styles.cardRoot} onClick={() => openLink(html_url)}>
        <div className={styles.box}>
        <Tooltip title={(
          <>
           {description && description.length !== 0 && (
              <>
                <b>Description:</b> &nbsp; {description}
                <br /> <hr /> <br />
              </>
            )}
            <i styles={{textAlign: 'center'}}>
              (Click to view this repository on Github)
            </i>
          </>
        )}>
          <div className={styles.title}>
            {name}
          </div>
        </Tooltip>
          {fork && <Tooltip title={fork ? "Forked from other source": "Not a fork"}>
            <div className={styles.fork}>
               <FontAwesomeIcon icon="code-branch" /> 
            </div>
          </Tooltip>}

          <div className={styles.boxContent}>
            <div className={styles.size}>
               <FontAwesomeIcon icon="folder-open" /> &nbsp; {size} kB
            </div>
            <div className={styles.time}>
              <UpdateIcon /> &nbsp; {compareDaysWithNow(updated_at)}
            </div>
          </div>
        </div>
      
    </div>
  );
}

export default RepoItemCard;
