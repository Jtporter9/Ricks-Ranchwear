//Node Modules
import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';

//Components
import Layout from '../components/Layout';
import ProductsPageContainer from '../components/productsPageContainer/productsPageContainer.js';

//Contexts
import {ContentProvider} from '../context/ContentContextV2';

export const KidsPageTemplate = ({
  products,
  brands
}) => (
  <ProductsPageContainer
    products={products}
    brands={brands}
    pageCategory={"kids"}
  />
);

KidsPageTemplate.propTypes = {
  products: PropTypes.array
};

const KidsPage = ({ data }) => {
  const [content, setContent] = useState({});

  for(let i = 0; i < data.allBigCommerceProducts.nodes.length; i++) {
    for(let j = 0; j < data.allBigCommerceBrands.edges.length; j++) {
      if (data.allBigCommerceProducts.nodes[i].brand_id === data.allBigCommerceBrands.edges[j].node.bigcommerce_id) {
        data.allBigCommerceProducts.nodes[i] = {...data.allBigCommerceProducts.nodes[i], brand: data.allBigCommerceBrands.edges[j].node }
      }
    }
  }
  
  const products = data.allBigCommerceProducts.nodes;
  const brands = data.allBigCommerceBrands.edges;

  useEffect(() => {
    fetch(`/.netlify/functions/graphCms?page=kidsPage`, {
      method: 'GET',
    })
      .then(response => response.json())
      .then(data => setContent(data.data.categoryPage))
      .catch(err => console.log(err));
  }, []);

  return (
    <>
      {
        content &&
        Object.keys(content).length !== 0 &&
        <ContentProvider value={content}>
          <Layout>
            <KidsPageTemplate
              products={products}
              brands={brands}
            />
          </Layout>
        </ContentProvider>
      }
    </>
  );
};

KidsPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object
    }),
    allBigCommerceProducts: PropTypes.shape({
      nodes: PropTypes.array
    })
  })
};

export default KidsPage;

// MENS 24
// WOMENS 25
// KIDS 26

export const kidsPageQuery = graphql`
  query KidsPage($id: String!) {
    allBigCommerceProducts(filter: {categories: {eq: 26}, is_visible: {eq: true}}) {
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
          url_standard
          url_thumbnail
          description
          is_thumbnail
          sort_order
          url_zoom
        }
        is_featured
        variants {
          product_id
          id
          option_values {
            label
            option_display_name
          }
          sku
          inventory_level
        }
        custom_fields {
          id
          name
          value
        }
        categories
        is_visible
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
