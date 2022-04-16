// Node Modules
import React from 'react';

const SelectionTooltip = ({ message }) => (
  <div className="tooltip-message">
    <p>{message}</p>
    <span className={"tooltip-message-carrot ttm-carrot-left"} />
    <span className={"tooltip-message-carrot ttm-carrot-right"} />
  </div>
);

export default SelectionTooltip;