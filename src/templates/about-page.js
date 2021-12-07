import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'
import AboutPageContainer from "src/components/about-page-container/AboutPageContainer";

// ASSETS
import ownerImg from '../assets/owner.jpg'
import bootRed from '../assets/boot-red.svg'
import redStore from '../assets/red-store.svg'
import logo from '../assets/logo.png';
import caretRightDark from '../assets/caret-right-dark.svg'
import ricksRanchwearLogo from '../assets/ricks-ranchwear-logo.svg'
import {ContentProvider} from "src/context/ContentContextV2";
import {CardBalancePageTemplate} from "src/templates/card-balance-page";

export const AboutPageTemplate = ({
  image,
  title,
  content,
  contentComponent
}) => {
  const PageContent = contentComponent || Content;

  const [graphCMSContent, setGraphCMSContent] = useState({});

  useEffect(() => {
    fetch(`/.netlify/functions/graphCms?page=aboutPage`, {
      method: 'GET',
    })
      .then(response => response.json())
      .then(data => setGraphCMSContent(data.data.aboutPage))
      .catch(err => console.log(err));
  }, []);

  return (
    <>
      {
        graphCMSContent &&
        Object.keys(graphCMSContent).length !== 0 &&
        <AboutPageContainer content={graphCMSContent} />
      }
      <div className="about-page">
      <div className="hero"
        style={{
          backgroundImage: `url(${!!image.childImageSharp ? image.childImageSharp.fluid.src : image
            })`
        }}>
        <div className="opaque-overlay"></div>
        <div className="hero-content-container">
          <h1>ABOUT</h1>
          <p>BOOT FACTORY OUTLET</p>
        </div>
      </div>

      <section className="in-the-beginning">
        <div className="in-the-beginning-head">
          <div className="content-left">
            <h3>In The Beginning</h3>
            <p>
              <strong>Rick’s Ranchwear</strong> opened for business on <strong>May, 20 1978</strong> in Youngstown, Ohio. At only 23 years of age, Rick Blase, our owner and President, took a leap of faith from shoe salesman to boot store owner opening his first store with only <strong>72 pairs</strong> of boots.
            </p>
            <p>
              Rick has worked endlessly to offer an unbelievable selection of boots, friendly and helpful staff, outstanding customer service, and great prices.
            </p>
            <p>
              Taking care of customers has been  the pillar of the business from day one, and that hasn’t changed a bit.
            </p>
          </div>
          <div className="content-right">
            <img src={ownerImg} alt="" />
          </div>
        </div>
        <div className="in-the-beginning-foot">
          <div className="content-left">
            <div className="dashed-head">
              <div className="dash"></div>
              <strong>1978</strong>
              <div className="dash"></div>
            </div>
            <div className="split-images">
              <div className="split-left">
                <img src={bootRed} alt="" />
                <h2>72</h2>
                <span>Pairs of Boots</span>
              </div>
              <div className="split-right">
                <img src={redStore} alt="" />
                <h2>1</h2>
                <span>Store Locations</span>
              </div>
            </div>
          </div>
          <div className="content-right">
            <h3>The Incredible Deal</h3>
            <p>
              The 72 pairs of boots that Rick started with soon turned into numbers he couldn’t have expected. The volume of boots that the shop was selling came with a new ability to offer prices unheard of in the industry.
            </p>
            <p>
              To make sure the best prices were offered to customers, Rick took another leap  and began to offer “buy one, get two free” on every boot in the store.            </p>
            <p>
              This incredible deal spread through word-of-mouth and cemented Rick’s stores in place as having the best boot prices in the country.
            </p>
          </div>
        </div>
      </section>

      <section className="boot-factory-outlet">
        <div className="boot-factory-outlet-content-container">
          <h2>Boot Factory Outlet</h2>
          <div className="images-split">
            <img src={ricksRanchwearLogo} alt="" />
            <img src={caretRightDark} alt="" />
            <img src={logo} alt="" />
          </div>
          <p>
            Rick’s Ranchwear became Boot Factory Outlet, because we stripped out most of our clothing to focus solely on providing the best selection of boots at the best possible prices.  We can confidently say that you will not find a better deal on boots, period.
          </p>
        </div>
      </section>

      <section className="in-the-beginning">
        <div className="in-the-beginning-foot">
          <div className="content-left">
            <div className="dashed-head">
              <div className="dash"></div>
              <strong>2020</strong>
              <div className="dash"></div>
            </div>
            <div className="split-images">
              <div className="split-left">
                <img src={bootRed} alt="" />
                <h2>1</h2>
                <span>New Online Store</span>
              </div>
              <div className="split-right">
                <img src={redStore} alt="" />
                <h2>8</h2>
                <span>Store Locations</span>
              </div>
            </div>
          </div>
          <div className="content-right">
            <h3>BootFactoryOutlet.com</h3>
            <p>
              With the craziness that 2020 brought, and after our customers asking for a long time, we decided it was time to make our deal available online.
            </p>
            <p>
              After over 40 years in business, you can now receive the same amazing price on boots no matter where you might be, and we will ship them right to your door.
            </p>
            <p>
              So whether you choose to shop in one of our retail stores, or on our website, we will strive to provide unparalleled customer service and the absolute best prices in the industry.
            </p>
          </div>
        </div>
      </section>
    </div>
    </>
  )
}

AboutPageTemplate.propTypes = {
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
  contentComponent: PropTypes.func,
}

const AboutPage = ({ data }) => {
  const { markdownRemark: post } = data

  return (
    <Layout>
      <AboutPageTemplate
        image={post.frontmatter.image}
        contentComponent={HTMLContent}
        title={post.frontmatter.title}
        content={post.html}
      />
    </Layout>
  )
}

AboutPage.propTypes = {
  data: PropTypes.object.isRequired,
}

export default AboutPage

export const aboutPageQuery = graphql`
  query AboutPage($id: String!) {
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
