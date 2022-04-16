// Node Modules
import React from 'react';
import { graphql } from 'gatsby';

// Components
import Layout from 'src/components/Layout';
import ProductPageContainer from "src/components/productPageContainer/productPageContainer";

// Contexts
import {ContentProvider} from "src/context/ContentContextV2";

export default (context) => {
  const { data: { allBigCommerceProducts, allBigCommerceBrands }, pageContext: { productId } } = context;

  for (let i = 0; i < allBigCommerceProducts.nodes.length; i++) {
    for (let j = 0; j < allBigCommerceBrands.edges.length; j++) {
      if (allBigCommerceProducts.nodes[i].brand_id === allBigCommerceBrands.edges[j].node.bigcommerce_id) {
        allBigCommerceProducts.nodes[i] = { ...allBigCommerceProducts.nodes[i], brand: allBigCommerceBrands.edges[j].node }
      }
    }
  }

  const { nodes: products } = allBigCommerceProducts;
  let product = {};

  // MOVE ALL OF THIS PRODUCT LOGIC TO THE COMPONENT CREATED FOR IT
  products.map(p => {
    if (p.id === productId) {
      product = p;
    }
  });

  return (
    <Layout>
      <ProductPageContainer
        activeProduct={product}
        products={products}
      />
    </Layout>
  )

  // TODO IMPLEMENT THIS COMMENTED OUT CODE WHEN GRAPHCMS CONTENT FOR THE PRODUCT PAGE IS CREATED
  // useEffect(() => {
  //   fetch(`/.netlify/functions/graphCms?page=productPage`, {
  //     method: 'GET',
  //   })
  //     .then(response => response.json())
  //     .then(data => setContent(data.data.indexPage))
  //     .catch(err => console.error(err));
  // }, []);

  // return (
  //   <>
  //     {
  //       content &&
  //       Object.keys(content).length !== 0 &&
  //       <ContentProvider value={content}>
  //         <Layout>
  //           <ProductPageContainer
    //           activeProduct={product}
    //           products={products}
  //           />
  //         </Layout>
  //       </ContentProvider>
  //     }
  //   </>
  // );
};

export const query = graphql`
  query {
    allBigCommerceProducts(sort: {fields: images___sort_order}, filter: {is_visible: {eq: true}}) {
      nodes {
        id
        brand_id
        bigcommerce_id
        name
        sku
        price
        calculated_price
        retail_price
        sale_price
        map_price
        description
        weight
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
          price
        }
        custom_fields {
          id
          name
          value
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
  }
`;
