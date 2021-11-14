import React from "react";

import PropTypes from 'prop-types';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Box from '@mui/material/Box';
import Zoom from '@mui/material/Zoom'

export default function ScrollTo(props) {
  const { children, window, idTo, autoShown, setPos } = props;

  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });
  const shown = autoShown ? true : trigger;

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector(
      '#'+idTo,
    );

    if (anchor) {
      anchor.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  };

  return (
    <Zoom in={shown}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={setPos ? { position: 'fixed', bottom: 16, right: 16 } : {}}
      >
        {children}
      </Box>
    </Zoom>
  );
}

ScrollTo.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
  idTo: PropTypes.string,
  autoShown: PropTypes.bool,
  setPos: PropTypes.bool
};

ScrollTo.defaultProps = {
  autoShown: false,
  setPos: true
}