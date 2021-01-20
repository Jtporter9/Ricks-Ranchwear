import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby';
import Layout from '../components/Layout'

// ASSETS

export const StoresPageTemplate = ({
  image,
  title
}) => {

  return (
    <div className="stores-page">
        STORES
    </div>
  )
}

StoresPageTemplate.propTypes = {
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  title: PropTypes.string.isRequired,
}

const StoresPage = ({ data }) => {
  const { markdownRemark: post } = data

  return (
    <Layout>
      <StoresPageTemplate
        image={post.frontmatter.image}
        title={post.frontmatter.title}
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
`
