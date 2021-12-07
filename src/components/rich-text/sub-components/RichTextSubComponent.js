// Node Modules
import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  bold: PropTypes.bool,
  italic: PropTypes.bool,
  text: PropTypes.string.isRequired,
  underline: PropTypes.bool,
};

const RichTextSubComponent = ({text, bold, italic, underline}) => {
  return (
    <>
      {bold && italic && underline && (<u><em><strong>{text}</strong></em></u>)}
      {bold && italic && !underline && (<em><strong>{text}</strong></em>)}
      {bold && !italic && !underline && (<strong>{text}</strong>)}
      {!bold && italic && !underline && (<em>{text}</em>)}
      {!bold && italic && underline && (<u><em>{text}</em></u>)}
      {bold && italic && !underline && (<u><strong>{text}</strong></u>)}
      {!bold && !italic && underline && (<u>{text}</u>)}
      {!bold && !italic && !underline && (<>{text}</>)}
    </>
  )
};

RichTextSubComponent.propTypes = propTypes;

export default RichTextSubComponent;
