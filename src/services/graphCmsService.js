import { GraphQLClient, gql } from 'graphql-request';

export const getContent = async (query) => {
  const endpoint = process.env.GATSBY_GRAPH_CMS_API_ENDPOINT;
  const bearer = `Bearer ${process.env.GATSBY_GRAPH_CMS_BEARER}`;
  const client = new GraphQLClient(endpoint, {
    headers: {
      authorization: bearer,
    }
  });

  const contentQuery = gql`
      query MyQuery {
          ${query}
      }
  `;

  const response = await client.request(contentQuery);

  return response;
};