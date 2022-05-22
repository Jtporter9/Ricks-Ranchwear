import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'

export const TestTemplate = ({
   image,
   title,
   content,
   contentComponent
 }) => {
  const PageContent = contentComponent || Content

  return (
    <p>{title}</p>
  )
}

// TestTemplate.propTypes = {
//   image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
//   title: PropTypes.string.isRequired,
//   content: PropTypes.string,
//   contentComponent: PropTypes.func,
// }

const TestPage = ({ data }) => {
  const { markdownRemark: post } = data

  return (
    <Layout>
      <TestTemplate
        contentComponent={HTMLContent}
        title={post.frontmatter.title}
        content={post.html}
      />
    </Layout>
  )
}

TestPage.propTypes = {
  data: PropTypes.object.isRequired,
}

export default TestPage

export const testPageQuery = graphql`
    query TestPage($id: String!) {
        markdownRemark(id: { eq: $id }) {
            html
            frontmatter {
                title
            }
        }
    }
`
