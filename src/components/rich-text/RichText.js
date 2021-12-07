// Node Modules
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

// Components
import RichTextSubComponent from './sub-components/RichTextSubComponent';

const propTypes = {
  richTextData: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string
  ]).isRequired,
  wrapperType: PropTypes.string,
};

const RichText = ({richTextData, wrapperType = "div"}) => {
  const supportedHTMLTypes = {
    headingOne: "heading-one",
    headingTwo: "heading-two",
    headingThree: "heading-three",
    headingFour: "heading-four",
    headingFive: "heading-five",
    headingSix: "heading-six",
    image: "image",
    paragraph: "paragraph",
    link: "link",
    blockQuote: "block-quote",
    listItem: "list-item",
    bulletedList: "bulleted-list",
    numberedList: "numbered-list",
    class: "class",
  };

  const headerTypes = [
    supportedHTMLTypes.headingOne,
    supportedHTMLTypes.headingTwo,
    supportedHTMLTypes.headingThree,
    supportedHTMLTypes.headingFour,
    supportedHTMLTypes.headingFive,
    supportedHTMLTypes.headingSix,
  ];

  const structureHTMLTypeString = string => {
    const splitString = string.split('-');
    let withCapitalization;

    if (splitString[0] !== 'heading') {
      withCapitalization = splitString.map((subString, id) => id === 0 ?
        subString :
        subString.charAt(0).toUpperCase() + subString.slice(1));
      return withCapitalization.join().replaceAll(',', '');
    } else {
      return splitString[0];
    }
  };

  const htmlTypeSetters = {
    blockQuote: content => (<blockquote className="rich-text-block-quote">{content}</blockquote>),
    bulletedList: () => (<ol className="rich-text-bulleted-list"></ol>),
    // class: (item, content) => {
    //   const {className} = item;
    //   return (
    //     <div className={className}>
    //       <p>{content}</p>
    //     </div>
    //   );
    // },
    class: () => (<></>),
    heading: (type, content) => {
      const headingStyleClass = "rich-text-heading";
      switch(type) {
        case "heading-one":
          return (<h1 className={headingStyleClass}>{content}</h1>);
        case "heading-two":
          return (<h2 className={headingStyleClass}>{content}</h2>);
        case "heading-three":
          return (<h3 className={headingStyleClass}>{content}</h3>);
        case "heading-four":
          return (<h4 className={headingStyleClass}>{content}</h4>);
        case "heading-five":
          return (<h5 className={headingStyleClass}>{content}</h5>);
        case "heading-six":
          return (<h6 className={headingStyleClass}>{content}</h6>);
        default:
          return (<h3 className={headingStyleClass}>{content}</h3>);
      }
    },
    image: item => {
      const {src, title} = item;
      return (<img src={src} alt={title}/>)
    },
    link: item => {
      const { text, href, openInNewTab } = item;
      return (<a href={href} target={openInNewTab && "_blank"} className="rich-text-link">{text}</a>)
    },
    listItemChild: item => (<li>{item.text}</li>),
    numberedList: () => (<ol className="rich-text-numbered-list"></ol>),
    paragraph: content => (<p className="rich-text-paragraph">{content}</p>),
    wrapperType: (type, content) => {
      const className = "rich-text-block"

      switch (type) {
        case "article":
          return (<article className={className}>{content}</article>);
        case "aside":
          return (<aside className={className}>{content}</aside>);
        case "div":
          return (<div className={className}>{content}</div>);
        case "section":
          return (<section className={className}>{content}</section>);
        default:
          return (<div className={className}>{content}</div>);
      }
    }
  };

  const filterContent = (data) => {
    const { children } = data;
    return children.map(rawItem => {

      const structureChildren = (item, recursionContent) => {
        const {children, type} = item;
        return children.map((childItem, id) => {
          const {
            text = "",
            bold = false,
            italic = false,
            underline = false,
            type: childType = "",
          } = childItem;

          console.log("TYPE: ", !childType);

          const content = (
            <>
              {recursionContent}
              {RichTextSubComponent({text, bold, italic, underline})}
            </>
          );

          if (headerTypes.includes(type)) {
            return (
              <React.Fragment key={id}>
                {htmlTypeSetters.heading(type,content)}
              </React.Fragment>
            );
          } else {
            if (Array.isArray(childItem.children)) {
              structureChildren(childItem, content);
            } else {
              //Figure out why this isnt putting the content in its parent
              if (!childType)
                return (<React.Fragment key={id}>{content}</React.Fragment>);

              return type !== supportedHTMLTypes.image && (
                <React.Fragment key={id}>
                  {htmlTypeSetters[structureHTMLTypeString(type)](content)}
                </React.Fragment>
              );
            }
          }
        })
      };

      return structureChildren(rawItem);
    });
  };

  const content = (
    <>
      {
        typeof richTextData === 'string' ?
          (<div className="set-by-string" dangerouslySetInnerHTML={{__html: richTextData}} />) :
          filterContent(richTextData)
      }
    </>
  );
  return (
    htmlTypeSetters.wrapperType(wrapperType, content)
  )
};

RichText.propTypes = propTypes;

export default RichText;

