// Node Modules
import React from "react";
import PropTypes from "prop-types";

const propTypes = {
  stroke: PropTypes.string
}

const StoreSvg = ({
  stroke="#DE3137",
  }) => (
    <>
      <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M22.6667 13.3334L58.6667 25.3334V52H46.6667M22.6667 13.3334L5.33333 25.3334V52H22.6667M22.6667 13.3334V52M22.6667 52H34.6667M34.6667 52V32L46.6667 36V52M34.6667 52H46.6667" stroke={stroke} strokeWidth="5.33333"/>
      </svg>
    </>
);

StoreSvg.propTypes = propTypes;

export default StoreSvg;