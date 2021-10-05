//Node Modules
import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';

//Components
import Layout from '../components/Layout';
import ProductPageContainer from '../components/productPageContainer/productPageContainer.js';

//Contexts
import {ContentProvider} from '../context/ContentContextV2';

export const AccessoriesPageTemplate = ({
  products,
  brands
}) => (
  <ProductPageContainer
    products={products}
    brands={brands}
  />
);

AccessoriesPageTemplate.propTypes = {
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  title: PropTypes.string,
  heading: PropTypes.string,
  description: PropTypes.string,
  products: PropTypes.array
};

const AccessoriesPage = ({ data }) => {
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
    fetch(`/.netlify/functions/graphCms?page=accessoriesPage`, {
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
            <AccessoriesPageTemplate
              products={products}
              brands={brands}
            />
          </Layout>
        </ContentProvider>
      }
    </>
  );
};

AccessoriesPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object
    }),
    allBigCommerceProducts: PropTypes.shape({
      nodes: PropTypes.array
    })
  })
};

export default AccessoriesPage;

export const AccessoriesPageQuery = graphql`
  query AccessoriesPage {
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
          inventory_level
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
    graphCMS {
        categoryPage(where: {id: "ckts7kbk0722p0b745dvt8qn3"}) {
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
