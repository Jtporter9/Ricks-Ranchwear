import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import Layout from '../components/Layout';
import ProductPageContainer from '../components/productPageContainer/productPageContainer.js';

export const WomensPageTemplate = ({
  image,
  title,
  heading,
  description,
  products
}) => (
  <ProductPageContainer 
    image={image}
    title={title}
    heading={heading}
    description={description}
    products={products}
  />
);

WomensPageTemplate.propTypes = {
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  title: PropTypes.string,
  heading: PropTypes.string,
  description: PropTypes.string,
  products: PropTypes.array
};

const WomensPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark;

  for(let i = 0; i < data.allBigCommerceProducts.nodes.length; i++) {
    for(let j = 0; j < data.allBigCommerceBrands.edges.length; j++) {
      if (data.allBigCommerceProducts.nodes[i].brand_id === data.allBigCommerceBrands.edges[j].node.bigcommerce_id) {
        data.allBigCommerceProducts.nodes[i] = {...data.allBigCommerceProducts.nodes[i], brand: data.allBigCommerceBrands.edges[j].node }
      }
    }
  }
  
  const products = data.allBigCommerceProducts.nodes;

  return (
    <Layout>
      <WomensPageTemplate
        image={frontmatter.image}
        title={frontmatter.title}
        heading={frontmatter.heading}
        description={frontmatter.description}
        products={products}
      />
    </Layout>
  );
};

WomensPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object
    }),
    allBigCommerceProducts: PropTypes.shape({
      nodes: PropTypes.array
    })
  })
};

export default WomensPage;

export const WomensPageQuery = graphql`
  query WomensPage($id: String!) {
    allBigCommerceProducts(filter: {categories: {eq: 25}}) {
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
    markdownRemark(id: { eq: $id }) {
      frontmatter {
        title
        image {
          childImageSharp {
            fluid(maxWidth: 2048, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`;