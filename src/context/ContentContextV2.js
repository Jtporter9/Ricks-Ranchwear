//Node Modules
import React, {useEffect, useState} from "react";

//Services
import {getContent} from "src/services/graphCmsService";

const contentActions = {
  setContent: "SET_CONTENT",
};

const contentReducer = (state, action) => {
  switch(action.type) {
    case contentActions.setContent:
      return {...state. action.payload};
    default:
      return state
  }
};

const initialContentState = {};

const ContentContext = React.createContext(initialContentState);

const ContentProvider = ({ value = initialContentState, children }) => {
  const [contentState, contentDispatch] = React.useReducer(
    contentReducer,
    value
  );

  const setContent = content => contentDispatch({type: contentActions.setContent, payload: content});

  const structuredValue = {
    content: {...contentState},
    setContent
  };

  return (
    <ContentContext.Provider value={structuredValue}>{children}</ContentContext.Provider>
  );
};

function useContentContext() {
  let context = React.useContext(ContentContext);
  if (context === undefined) {
    context = {...initialContentState};
  }
  return context;
}

export { ContentProvider, useContentContext };
