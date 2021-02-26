import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby';
import Layout from '../components/Layout'
import StoreCollapsible from '../components/storeCollapsible/storeCollapsible'

// ASSETS
import redStore from '../assets/red-store.svg'

export const StoresPageTemplate = ({
  title,
  locations
}) => {
  return (
    <div className="stores-page">
      <div className="stores-page-hero">
        <img src={redStore} alt="Store Locations" />
        <h2>Store Locations</h2>
        <p className="hero-subtext">Boot Factory Outlet</p>
      </div>

      <section style={{ marginBottom: '7rem' }} className="collapsibles-section">
        {locations.map((location, i) => (
            <StoreCollapsible key={i} location={location} last={(i + 1) === locations.length ? true : false} />
          )
        )}

      </section>
    </div>
  )
}

StoresPageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
}

const StoresPage = ({ data }) => {
  const { markdownRemark: post } = data

  const locations = [
    { "stateStores": [post.frontmatter.store1]},
    { "stateStores": [post.frontmatter.store2, post.frontmatter.store3, post.frontmatter.store4, post.frontmatter.store5]},
    { "stateStores": [post.frontmatter.store6, post.frontmatter.store7]},
    { "stateStores": [post.frontmatter.store8]}
  ];

  return (
    <Layout>
      <StoresPageTemplate
        title={post.frontmatter.title}
        locations={locations}
      />
    </Layout>
  )
}

StoresPage.propTypes = {
  data: PropTypes.object.isRequired,
}

export default StoresPage

export const storesPageQuery = graphql`
  query StoresPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
        store1 {
            body
            company
            location
            state
            image {
              childImageSharp {
                fluid(maxWidth: 2048, quality: 100) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            store_hours {
              body
            } 
            phone
            address {
              city_state
              post_code
              street
            }
          }
        store2 {
            body
            company
            location
            state
            image {
              childImageSharp {
                fluid(maxWidth: 2048, quality: 100) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            store_hours {
              body
            }
            phone
            address {
              city_state
              post_code
              street
            }
          }
        store3 {
            body
            company
            location
            state
            image {
              childImageSharp {
                fluid(maxWidth: 2048, quality: 100) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            store_hours {
              body
            }
            phone
            address {
              city_state
              post_code
              street
            }
          }
        store4 {
            body
            company
            location
            state
            image {
              childImageSharp {
                fluid(maxWidth: 2048, quality: 100) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            store_hours {
              body
            }
            phone
            address {
              city_state
              post_code
              street
            }
          }
          store5 {
            body
            company
            location
            state
            image {
              childImageSharp {
                fluid(maxWidth: 2048, quality: 100) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            store_hours {
              body
            }
            phone
            address {
              city_state
              post_code
              street
            }
          }
          store6 {
            body
            company
            location
            state
            image {
              childImageSharp {
                fluid(maxWidth: 2048, quality: 100) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            store_hours {
              body
            }
            phone
            address {
              city_state
              post_code
              street
            }
          }
          store7 {
            body
            company
            location
            state
            image {
              childImageSharp {
                fluid(maxWidth: 2048, quality: 100) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            store_hours {
              body
            }
            phone
            address {
              city_state
              post_code
              street
            }
          }
          store8 {
            body
            company
            location
            state
            image {
              childImageSharp {
                fluid(maxWidth: 2048, quality: 100) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            store_hours {
              body
            }
            phone
            address {
              city_state
              post_code
              street
            }
          }
      }
    }
  }
`
