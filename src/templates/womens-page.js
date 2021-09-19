//Node Modules
import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';

//Components
import Layout from '../components/Layout';
import ProductPageContainer from '../components/productPageContainer/productPageContainer.js';

//Contexts
import {ContentProvider} from '../context/ContentContextV2';

export const WomensPageTemplate = ({
  image,
  title,
  heading,
  description,
  products,
  brands
}) => (
  <ProductPageContainer 
    image={image}
    title={title}
    heading={heading}
    description={description}
    products={products}
    brands={brands}
    pageCategory={"womens"}
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
  const brands = data.allBigCommerceBrands.edges;

  return (
    <ContentProvider value={data.graphCMS.categoryPage}>
      <Layout>
        <WomensPageTemplate
          image={frontmatter.image}
          title={frontmatter.title}
          heading={frontmatter.heading}
          description={frontmatter.description}
          products={products}
          brands={brands}
        />
      </Layout>
    </ContentProvider>
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
    allBigCommerceProducts(filter: {categories: {eq: 25}, is_visible: {eq: true}}) {
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
    graphCMS {
        categoryPage(where: {id: "cktmf0v1co68r0b706lgptnm1"}) {
              pageTitle
              heroHeaderText
              heroImage {
                  url
              }
              storeBanner {
                  bannerText
                  bannerLink {
                      text
                      link
                  }
                  bannerStoreIcon {
                      url
                  }
              }
              filterContent {
                  filterIcon {
                      url
                  }
                  filterHeaderText
                  noFiltersSelectedText
                  clearAllText
                  categoryOptionText
                  categoryOptions {
                      text
                      link
                  }
              }
              resultsText
              quickFilters
              topSellingText
              shared {
                  navbar {
                      navbarContent {
                          dropdownIdentifier
                          sectionHeader
                          sectionHeaderLink
                          navbarItems {
                              itemHeader
                              navbarSubitems {
                                  text
                                  link
                              }
                          }
                      }
                      mobileHamburgerLogo {
                          url
                      }
                      cartIconBlack {
                          url
                      }
                      cartIconWhite {
                          url
                      }
                      bootFactoryLogo {
                          url
                      }
                      desktopHeaders {
                          hasDropdown
                          headerLink {
                              link
                              text
                          }
                      }
                      aboutLink {
                          text
                          link
                      }
                      helpLink {
                          text
                          link
                      }
                      viewCartText
                  }
                  footer {
                      footerHeader
                      footerSubHeader
                      infoLinksHeader
                      infoLinks {
                          link
                          text
                      }
                      emailSubscriptionInput {
                          label
                          placeholder
                          errorContent
                      }
                      bootFactoryLogos {
                          url
                      }
                      socialMediaLinks {
                          imageOrAsset {
                              url
                          }
                          link
                          externalLink
                      }
                      copyrightText
                  }
                  buyOneGetTwoBanner {
                      buyOneGetTwoText
                      modalHeader
                      modalContent
                      continueButtonText
                      policiesButton {
                          text
                          link
                      }
                      bootsIconWhite {
                          url
                      }
                      bootsIconRed {
                          url
                      }
                      infoIconWhite {
                          url
                      }
                      infoIconBlack {
                          url
                      }
                  }
              }
          }
      }
  }
`;
