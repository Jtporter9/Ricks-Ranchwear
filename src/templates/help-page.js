import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby';
import Layout from '../components/Layout'
import InfoCollapsible from '../components/infoCollapsible/infoCollapsible';

// ASSETS
import redBootsIcon from '../assets/boots-red.svg';

export const HelpPageTemplate = ({
  image,
  title,
  InfoCollapsible
}) => {

  return (
    <div className="help-page">
      <div className="hero"
        style={{
          backgroundImage: `url(${!!image.childImageSharp ? image.childImageSharp.fluid.src : image
            })`
        }}>
        <div className="opaque-overlay"></div>
        <div className="hero-content-container">
          <h1>Help & FAQ</h1>
          <p>BOOT FACTORY OUTLET</p>
        </div>
      </div>

      <div className="help-sub-menu">
        <div>
          <a href="#buy-one-get-two" className="jump-to-link">Buy 1, get 2</a>
          <a href="#shipping" className="jump-to-link">Shipping</a>
          <a href="#returns" className="jump-to-link">Returns</a>
          <a href="#exchanges" className="jump-to-link">exchanges</a>
          <a href="#faqs" className="jump-to-link">FAQ</a>
        </div>
      </div>

      <section id="buy-one-get-two" className="buy-one-get-two">
        <div className="lined-header">
          <div className="dash"></div>
          <h2>Buy 1, Get 2</h2>
          <div className="dash"></div>
        </div>
        <img src={redBootsIcon} alt="Buy 1, get 2" />
        <div className="meta-container">
          <div className="info-block">
            <h3>We know what you’re thinking…</h3>
            <p>“How does it work exactly?”</p>
            <p>“It sounds too good to be true.”</p>
            <p>“I don’t believe they would give away 2 pairs of boots for FREE.”</p>
            <p>“What’s the catch?”</p>
          </div>

          <div className="info-block">
            <h3>But that’s exactly what we do!</h3>
            <p>It’s an AMAZING offer, and there’s no catch. We pride ourselves on offering high quality boots at an unbelievable price while providing an excellent shopping experience.</p>
          </div>

          <div className="info-block">
            <h3>Here’s how the deal works:</h3>
            <p>
              Select any 3 pairs of boots you like. There are no restrictions. You can mix and match men’s, women’s, children’s, any size and any style. You could outfit the whole family, split them with friends, or buy all 3 pairs for yourself! It’s based on the highest priced boot and the other two pairs are FREE! Once you have three pairs of boots in your cart, your total price will reflect the cost of the single highest priced pair.
            </p>
          </div>
        </div>

        <div className="meta-banner">
          <div className="small-info-block">
            <h4>Can I buy more than 3 pairs?</h4>
            <p>
              Yes, feel free to add as many pairs as you want to your cart, but to receive the maximum discount, make sure they are in increments of 3.
            </p>
          </div>
          <div className="small-info-block">
            <h4>I’m a dealer, can I order in bulk?</h4>
            <p>
              Yes! We are happy to sell to dealers, but we have a dealer limit of 200 pairs. Please contact us to inquire about bulk shipping discounts.
            </p>
          </div>
          <div className="small-info-block">
            <h4>But really, what’s the catch?</h4>
            <p>
              There really isn't one. We can offer this deal because of the volume of boots it allows us to sell. We only sell top-quality boots.
            </p>
          </div>
        </div>

        <div className="cta-block">
          <h3>Don’t believe us?</h3>
          <p>
            We dare you to find a better deal out there. When you take advantage our buy one, get two deal, we guarantee the lowest prices in the country
          </p>
          <Link to='/mens'>Shop our boot selection</Link>
        </div>
      </section>

      <section id="shipping" className="shipping">
        <div className="lined-header">
          <div className="dash"></div>
          <h2>Shipping</h2>
          <div className="dash"></div>
        </div>
        <div className="meta-container">
          <div className="info-block">
            <h3>Shipping Policy</h3>
            <p>
              We offer shipping to anywhere in the U.S. (except HI or AK) for a flat rate of $15 total for every 3 pairs you order. Example: If you order 6 pairs of boots, your shipping cost will be $30. We know this isn’t as good as free, but shipping 3 pairs of cowboy boots isn’t cheap! Even with the cost of shipping, you won’t find a deal anywhere close to this good. Alternatively, come into one of our retail stores and skip the shipping costs.
            </p>
          </div>
        </div>
      </section>

      <section id="returns" className="returns">
        <div className="lined-header">
          <div className="dash"></div>
          <h2>Returns</h2>
          <div className="dash"></div>
        </div>
        <div className="meta-container">
          <div className="info-block">
            <h3>Return Policy</h3>
            <p>
              Refunds are welcome on unworn footwear within 30 days of purchase. It’s ok to try them on, but please do so carefully, ideally on carpet as not to scuff the soles. We charge a flat return shipping rate of $15 per 3 pairs of boots (the $15 fee is simply deducted from the total refund). Please contact us if you would like to make a return, and we will provide you a shipping label. Alternatively, feel free to make returns to one of our retail stores and avoid the $15 return fee.
            </p>
            <p>
              Refunds on footwear are only available on the entire boot purchase. We are unable to accept partial returns on Buy One Get Two Free.
            </p>
          </div>
          <div className="info-block">
            <h3>Simplified  Policy</h3>
            <p>
              <strong>Returns on unworn boots</strong> - $15 return shipping cost per 3 pairs of boots (or free in-store).
            </p>
            <p>
              <strong>Exchanges on unworn boots</strong> - $12 exchange fee per 1 pair of boots or $30 per 3 pairs. (or free in-store).
            </p>
          </div>
        </div>
      </section>

      <section id="exchanges" className="exchanges">
        <div className="lined-header">
          <div className="dash"></div>
          <h2>Exchanges</h2>
          <div className="dash"></div>
        </div>
        <div className="meta-container">
          <div className="info-block">
            <h3>Exchanges</h3>
            <p>
              Did you order something, but don’t like the style or the way it fits? We are happy to exchange unworn footwear for up to 90 days from the date of purchase. We charge a flat exchange rate of $12 per pair to cover the cost of return shipping and shipping out the new pair. If you want to exchange all 3 pairs, we can reduce this fee to $30 total (it costs us less per pair when we ship in bulk). Please contact us and we can provide you a return shipping label for your exchange. Alternatively, feel free to make exchanges at one of our retail stores and avoid the exchange shipping fee.            </p>
          </div>
        </div>
      </section>

      <section id="faqs" className="faqs">
        <div className="lined-header">
          <div className="dash"></div>
          <h2>FAQ's</h2>
          <div className="dash"></div>
        </div>
        <div className="meta-container">
          <InfoCollapsible
            title="This is a question people ask alot"
            content="I'm baby la croix tacos bitters cold-pressed gastropub aesthetic banh mi woke street art tousled selvage. Pinterest hexagon cardigan truffaut activated charcoal locavore sriracha hella disrupt portland synth. Pitchfork post-ironic gluten-free unicorn. Kogi pork belly tacos tilde 3 wolf moon. Hell of iPhone 3 wolf moon ramps hashtag poutine kinfolk sustainable snackwave."
            last={false}
          />
          <InfoCollapsible
            title="This is a question people ask alot"
            content="I'm baby la croix tacos bitters cold-pressed gastropub aesthetic banh mi woke street art tousled selvage. Pinterest hexagon cardigan truffaut activated charcoal locavore sriracha hella disrupt portland synth. Pitchfork post-ironic gluten-free unicorn. Kogi pork belly tacos tilde 3 wolf moon. Hell of iPhone 3 wolf moon ramps hashtag poutine kinfolk sustainable snackwave."
            last={true}
          />
        </div>
      </section>

    </div>
  )
}

HelpPageTemplate.propTypes = {
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  title: PropTypes.string.isRequired,
}

const HelpPage = ({ data }) => {
  const { markdownRemark: post } = data

  return (
    <Layout>
      <HelpPageTemplate
        image={post.frontmatter.image}
        title={post.frontmatter.title}
        InfoCollapsible={InfoCollapsible}
      />
    </Layout>
  )
}

HelpPage.propTypes = {
  data: PropTypes.object.isRequired,
}

export default HelpPage

export const helpPageQuery = graphql`
  query HelpPage($id: String!) {
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
