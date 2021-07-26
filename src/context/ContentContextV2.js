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

const ContentProvider = ({ value = initialContentState, children, query }) => {
  const [contentState, contentDispatch] = React.useReducer(
    contentReducer,
    value
  );

  const [fetchedContent, updateFetchedContent] = useState({});

  const setContent = content => contentDispatch({type: contentActions.setContent, payload: content});

    useEffect(async () => {
      if (query) {
        const graphCMSContent = await getContent(query);
        updateFetchedContent(Object.values(graphCMSContent)[0]);
      }
    }, []);


  const structuredValue = {
    content: query ? {...fetchedContent} : {...contentState},
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
