//Node Modules
require('dotenv').config();
const axios = require('axios');
import {
  aboutPageQuery,
  categoryPageQuery,
  cardBalanceQuery,
  entryIds,
  homePageQuery,
  sharedQuery
} from "../consants/graphCmsEntries";

const replacerFunc = () => {
  const visited = new WeakSet();
  return (key, value) => {
    if (typeof value === "object" && value !== null) {
      if (visited.has(value)) {
        return;
      }
      visited.add(value);
    }
    return value;
  };
};

exports.handler = async (event, context) => {
  const pageQueries = {
    aboutpage: aboutPageQuery,
    accessoriespage: categoryPageQuery(entryIds.accessoriesPage),
    cardbalancepage: cardBalanceQuery,
    homepage: homePageQuery,
    kidspage: categoryPageQuery(entryIds.kidsPage),
    menspage: categoryPageQuery(entryIds.mensPage),
    womenspage: categoryPageQuery(entryIds.womensPage),
  };

  //only log in development mode
  const devModeLog = str => process.env !== 'production' && console.log(str);

  devModeLog('----- New Request -----');

  const bearer = `Bearer ${process.env.GRAPH_CMS_BEARER}`;

  const graphql = JSON.stringify({
    query: `
      query MyQuery {
            ${pageQueries[event.queryStringParameters.page.toLowerCase()]}
            ${sharedQuery}
            }
        }
  `,
    variables: {}
  });

  return axios({
    method: 'POST',
    url: process.env.GRAPH_CMS_API_ENDPOINT,
    data: graphql,
    headers: {
      contentType: "application/json",
      Authorization: bearer
    }
  })
    .then(response => ({
      statusCode: 200,
      body: JSON.stringify(response.data, replacerFunc())
    }))
    .catch((error) => {
      console.log("THERE WAS AN ERROR: ", error.message);
      return { statusCode: error.status, body: JSON.stringify({err: {...error}, graphql}) }
    });
};