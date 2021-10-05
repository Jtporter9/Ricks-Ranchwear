//Node Modules
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';

//Components
import Layout from '../components/Layout';
import ProductPageContainer from '../components/productPageContainer/productPageContainer.js';

//Contexts
import {ContentProvider} from '../context/ContentContextV2';

export const MensPageTemplate = ({
  products,
  brands
}) => (
  <ProductPageContainer
    products={products}
    brands={brands}
    pageCategory={"mens"}
  />
);

MensPageTemplate.propTypes = {
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  title: PropTypes.string,
  heading: PropTypes.string,
  description: PropTypes.string,
  products: PropTypes.array
};

const MensPage = ({ data }) => {
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
    fetch(`/.netlify/functions/graphCms?page=mensPage`, {
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
            <MensPageTemplate
              products={products}
              brands={brands}
            />
          </Layout>
        </ContentProvider>
      }
    </>
  );
};

MensPage.propTypes = {
  data: PropTypes.shape({
    allBigCommerceProducts: PropTypes.shape({
      nodes: PropTypes.array
    }),
    graphCMS: PropTypes.shape({})
  })
};

export default MensPage;

// MENS 24
// WOMENS 25
// KIDS 26

export const mensPageQuery = graphql`
  query MensPage {
    allBigCommerceProducts(filter: {categories: {eq: 24}, is_visible: {eq: true}}) {
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
  }
`;
