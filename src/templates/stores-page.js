import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby';
import Layout from '../components/Layout'
import StoreCollapsible from '../components/storeCollapsible/storeCollapsible'

// ASSETS
import redStore from '../assets/red-store.svg'

export const StoresPageTemplate = ({
  title,
  stores
}) => {
  return (
    <div className="stores-page">
      <div className="stores-page-hero">
        <img src={redStore} alt="Store Locations"/>
        <h2>Store Locations</h2>
        <p className="hero-subtext">Boot Factory Outlet</p>
      </div>

      <section className="collapsibles-section">
        {stores.map((store, i) => {
          return (
            <StoreCollapsible key={i} store={store} />
          )
        })}

      </section>
    </div>
  )
}

StoresPageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
}

const StoresPage = ({ data }) => {
  const { markdownRemark: post } = data
  const stores = [ post.frontmatter.store1, post.frontmatter.store2, post.frontmatter.store3, post.frontmatter.store4 ];

  return (
    <Layout>
      <StoresPageTemplate
        title={post.frontmatter.title}
        stores={stores}
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
          }
      }
    }
  }
`
