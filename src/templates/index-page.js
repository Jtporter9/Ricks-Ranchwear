//Node Mdoules
import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import { Link, graphql } from 'gatsby';

//Components
import Layout from '../components/Layout';
import HomePageContainer from '../components/homePageContainer/homePageContainer';

//Contexts
import {ContentProvider} from '../context/ContentContextV2';

export const IndexPageTemplate = ({
  post,
  products
}) => (
      <HomePageContainer
        post={post}
        products={products}
      />
  );

IndexPageTemplate.propTypes = {
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  title: PropTypes.string,
  subtitle: PropTypes.string,
  heading: PropTypes.string,
  mainpitch: PropTypes.object,
  bigimage: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  description: PropTypes.string,
  intro: PropTypes.shape({
    blurbs: PropTypes.array
  }),
  post: PropTypes.object,
  products: PropTypes.array
};

const IndexPage = ({ data }) => {
  const [content, setContent] = useState({});
  for(let i = 0; i < data.allBigCommerceProducts.nodes.length; i++) {
    for(let j = 0; j < data.allBigCommerceBrands.edges.length; j++) {
      if (data.allBigCommerceProducts.nodes[i].brand_id === data.allBigCommerceBrands.edges[j].node.bigcommerce_id) {
        data.allBigCommerceProducts.nodes[i] = {...data.allBigCommerceProducts.nodes[i], brand: data.allBigCommerceBrands.edges[j].node }
      }
    }
  }
  
  const products = data.allBigCommerceProducts.nodes;

  useEffect(() => {
    fetch(`/.netlify/functions/graphCms?page=homePage`, {
      method: 'GET',
    })
      .then(response => response.json())
      .then(data => setContent(data.data.indexPage))
      .catch(err => console.log(err));
  }, []);

  return (
    <>
      {
        content &&
        Object.keys(content).length !== 0 &&
        <ContentProvider value={content}>
          <Layout>
            <IndexPageTemplate
              post={data.allMarkdownRemark.edges[0].node}
              products={products}
            />
          </Layout>
        </ContentProvider>
      }
    </>
  );
};

IndexPage.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
    allBigCommerceProducts: PropTypes.shape({
      nodes: PropTypes.array
    }),
    graphCMS: PropTypes.shape({

    })
  })
};

export default IndexPage;

export const pageQuery = graphql`
  query IndexPageTemplate {
    allBigCommerceProducts(filter: {is_visible: {eq: true}}) {
      nodes {
        id
        brand_id
        name
        sku
        price
        calculated_price
        retail_price
        sale_price
        map_price
        bigcommerce_id
        custom_url {
          url
        }
        images {
          url_thumbnail
          url_standard
          description
          is_thumbnail
          url_zoom
        }
        variants {
          product_id
          id
          option_values {
            label
            option_display_name
          }
          sku
        }
      }
    }
    allBigCommerceBrands {
      edges {
        node {
          id
          name
          bigcommerce_id
        }
      }
    }
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___featuredpost, frontmatter___date] }
      filter: { frontmatter: { templateKey: { eq: "blog-post" } } }
      limit: 1
    ) {
      edges {
        node {
          excerpt(pruneLength: 400)
          id
          fields {
            slug
          }
          frontmatter {
            title
            templateKey
            # date(formatString: "MMMM DD, YYYY")
            featuredpost
            featuredimage {
              childImageSharp {
                fluid(maxWidth: 120, quality: 100) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    } 
  }
`;
