import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby';
import Layout from '../components/Layout'
import InfoCollapsible from '../components/infoCollapsible/infoCollapsible';

// ASSETS
import redBootsIcon from '../assets/boots-red.svg';

export const BootFitGuidePageTemplate = ({
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
          <h1>Fit Guide</h1>
          <p>BOOT FACTORY OUTLET</p>
        </div>
      </div>

      <div className="help-sub-menu">
        <div style={{ width: "350px" }}>
          <a href="#bootfitguide" className="jump-to-link">Boot Fit Guide</a>
          <a href="#bootcare" className="jump-to-link">Boot Care</a>
        </div>
      </div>

      <section id="bootfitguide" className="buy-one-get-two">
        <div className="lined-header">
          <div className="dash"></div>
          <h2>Boot Fit Guide</h2>
          <div className="dash"></div>
        </div>
        <div className="meta-container">
          <div>
            <h4 className="sub-heading">How Your Boots Should Feel</h4>
            <p className="sub-heading-description">
              Each pair of J.B. Dillon Reserve boots have a unique comfortable fit that will mold perfectly to your foot with wear.
            </p>
          </div>
          <div className="info-block">
            <h3>Pro Tip</h3>
            <p className="sub-label">When trying on your boot for the first time, pull it on using the straps</p>
            <p className="sub-description">
              Once you feel a slight resistance,  place your foot firmly on the floor pushing down while continuing to pull up on the bootstraps at the same time. You should feel your heel pop down into the foot of the boot
            </p>
          </div>

          <div className="info-block">
            <h3>Make Sure It’s A Perfect Fit</h3>
            <p className="sub-label">1. Instep</p>
            <p className="sub-description">
              The boot should fit snug across the instep of your foot, but not too tight. This area of the boot will stretch and form to your foot.             </p>
            <p className="sub-label">2. Toes</p>
            <p className="sub-description">
              Your toes should fit comfortably with the ability to slightly move. They should not feel pinched or crammed into the boot.             </p>
            <p className="sub-label">3. Ball of the foot</p>
            <p className="sub-description">
              The ball of your foot should fit the widest part of the boot. The proper position of the ball of your foot will also ensure the proper placement of your toes inside the boot.             </p>
            <p className="sub-label">4. Heel Slip</p>
            <p className="sub-description">
              The ball of your foot should fit the widest part of the boot. The proper position of the ball of your foot will also ensure the proper placement of your toes inside the boot.             </p>
          </div>
        </div>

      </section>

      <section id="bootcare" className="faqs">
        <div className="lined-header">
          <div className="dash"></div>
          <h2>Boot Care</h2>
          <div className="dash"></div>
        </div>
        <div className="meta-container">
          <InfoCollapsible
            title="How to dust and clean your boots"
            content="Wipe or brush off your boots often. When dusting off isn’t enough, wash off any loose dirt with a damp rag or soft brush… follow up with applying  J.B. DILLON CUSTOM LEATHER CARE. We do not recommend saddle soap because it dries the leather."
            last={false}
          />
          <InfoCollapsible
            title="Conditioning your boots"
            content="Use J.B. DILLON CUSTOM LEATHER CARE. All leather dries out and needs moisturizing to keep it supple and free of cracking. Conditioner will add oils back into the leather, keeping it soft and supple. We recommend conditioning your boots every 1-2 months."
            last={false}
          />
          <InfoCollapsible
            title="How to Polish Your Boots"
            content="Before polishing a boot, we recommend using J.B. Dillon Custom Leather Care to replace the natural oils in the leather. Give the cream a few minutes to dry and then buff the leather. If a polish is still needed, we recommend using a neutral polish to not change the color of the boots."
            last={false}
          />
          <InfoCollapsible
            title="HOw to Care for exotic boots"
            content="Exotic skins tend to have more texture. For this reason, you should dust and condition them more frequently. Clean your exotic skin boots with J.B. DILLON CUSTOM LEATHER CARE. This product is designed to remove the dirt out of the leather, and to protect the natural membranes from cracking. Remember that exotics need to be conditioned more often than other types of leather; we recommend once a month. When cleaning and conditioning Python skin, always wipe or brush in the direction of the scales. NEVER brush or wipe against the scales, as this can cause curling or breakage."
            last={false}
          />
          <InfoCollapsible
            title="What Happens when your boots get wet"
            content="Dry your boots at room temperature. Never place them near heat, as heat will cause the leather to dry and crack. Use J.B. DILLON CUSTOM LEATHER CARE while the boots are still wet. Use white vinegar if white salt stains appear when the boots have dried. These deposits should be removed immediately. If not, the salt will eat away and weaken the leather."
            last={false}
          />
          <InfoCollapsible
            title="How to Take off your boots properly"
            content="Never take boots off using the toe of one boot against the heel of another. This will break down the back of the heel and shorten its life. Instead, place your ankle on the knee of your other leg and pull off the boot by grasping it at the heel and toe. Using a BOOT JACK is also an easy method of removing your boots."
            last={false}
          />
          <InfoCollapsible
            title="Important"
            content="When using any conditioners, cleaning methods, or polishes, test a small part of your boot, (inside the boot pulls are a good place) beforehand. This is especially important on any light-colored leathers. ASK QUESTIONS If you have any questions about your boots or proper boot care, please ask. We love people who take care of their boots."
            last={true}
          />
        </div>
      </section>

    </div>
  )
}

BootFitGuidePageTemplate.propTypes = {
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  title: PropTypes.string.isRequired,
}

const BootFitGuidePage = ({ data }) => {
  const { markdownRemark: post } = data

  return (
    <Layout>
      <BootFitGuidePageTemplate
        image={post.frontmatter.image}
        title={post.frontmatter.title}
        InfoCollapsible={InfoCollapsible}
      />
    </Layout>
  )
}

BootFitGuidePage.propTypes = {
  data: PropTypes.object.isRequired,
}

export default BootFitGuidePage

export const bootFitGuidePageQuery = graphql`
  query BootFitGuidePage($id: String!) {
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
