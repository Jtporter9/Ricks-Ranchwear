//Node Mdoules
import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';

//Components
import Layout from '../components/Layout';
import CardBalanceForm from "src/components/card/balance/CheckBalanceForm";

//Contexts
import {ContentProvider} from '../context/ContentContextV2';

//Services
import {getContent} from "src/services/graphCmsService";

//Constants
import graphCmsEntries from "src/consants/graphCmsEntries";

export const CardBalancePageTemplate = () => (
  <>
    <CardBalanceForm />
  </>
);

CardBalancePageTemplate.propTypes = {
  title: PropTypes.string,
};

const CardBalancePage = ({ data }) => {

    const cardBalanceQuery = `
          cardBalancePage(where: {id: "${graphCmsEntries.cardBalanceEntryId}"}) {
              cardBalanceHeader
              cardNumberLabel
              cardNumberPlaceholder
              checkBalanceButtonText
              giftCardDisclaimerText
              pinLabel
              pinPlaceholder
              preFetchedBalanceText
              yourBalanceText
          }
      `

  return (
    <Layout>
      <ContentProvider query={cardBalanceQuery}>
        <CardBalancePageTemplate
        />
      </ContentProvider>
    </Layout>
  );
};

CardBalancePage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object
    }),
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
    allBigCommerceProducts: PropTypes.shape({
      nodes: PropTypes.array
    })
  })
};

export default CardBalancePage;

export const pageQuery = graphql`
    query CardBalancePageTemplate {
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
        markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
            frontmatter {
                title
                subtitle
                categoryCardsContent {
                    categoryImage {
                        altText
                        image {
                            childImageSharp {
                                fluid(maxWidth: 2048, quality: 100) {
                                    ...GatsbyImageSharpFluid
                                }
                            }
                        }
                    }
                    categoryText
                    linkBtn {
                        link
                        text
                    }
                }
                heroContent {
                    heroBootsIcon {
                        altText
                        image {
                            publicURL
                        }
                    }
                    heroBtn {
                        text
                        link
                    }
                    heroHeading
                    heroImage {
                        altText
                        image {
                            childImageSharp {
                                fluid(maxWidth: 2048, quality: 100) {
                                    ...GatsbyImageSharpFluid
                                }
                            }
                        }
                    }
                    heroSubHeading
                }
                introContent {
                    bootCountryLogoImage {
                        altText
                        image {
                            childImageSharp {
                                fluid(maxWidth: 2048, quality: 100) {
                                    ...GatsbyImageSharpFluid
                                }
                            }
                        }
                    }
                    introDescription
                    logoImage {
                        altText
                        image {
                            childImageSharp {
                                fluid(maxWidth: 2048, quality: 100) {
                                    ...GatsbyImageSharpFluid
                                }
                            }
                        }
                    }
                    viewStoresBtn {
                        link
                        text
                    }
                    welcomeHeading
                    welcomeSubHeading
                }
                dynamicProductContent {
                    productImage {
                        altText
                        image {
                            childImageSharp {
                                fluid(maxWidth: 2048, quality: 100) {
                                    ...GatsbyImageSharpFluid
                                }
                            }
                        }
                    }
                    heading
                    subHeading
                    description
                    linkBtn {
                        link
                        text
                    }
                }
                storesSectionContent {
                    heading
                    subHeading
                    description
                    linkBtn {
                        link
                        text
                    }
                    storeImage {
                        altText
                        image {
                            childImageSharp {
                                fluid(maxWidth: 2048, quality: 100) {
                                    ...GatsbyImageSharpFluid
                                }
                            }
                        }
                    }
                }
                siteCookiesBannerContent {
                    mainText
                    linkBtn {
                        link
                        text
                    }
                    closeText
                }
                image {
                    childImageSharp {
                        fluid(maxWidth: 2048, quality: 100) {
                            ...GatsbyImageSharpFluid
                        }
                    }
                }
                heading
                mainpitch {
                    title
                    description
                }
                bigimage {
                    image {
                        childImageSharp {
                            fluid(maxWidth: 240, quality: 64) {
                                ...GatsbyImageSharpFluid
                            }
                        }
                        publicURL
                    }
                    alt
                }
                intro {
                    blurbs {
                        image {
                            childImageSharp {
                                fluid(maxWidth: 240, quality: 64) {
                                    ...GatsbyImageSharpFluid
                                }
                            }
                        }
                        text
                    }
                    heading
                    description
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
