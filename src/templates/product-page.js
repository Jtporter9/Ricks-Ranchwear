import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import Layout from '../components/Layout';
import ProductCard from '../components/bigcommerce/ProductCard';
import logo from '../assets/logo.svg';
import caretDownLight from '../assets/caret-down-light.svg';
import hamburgerLogo from '../assets/hamburger.svg';

export const ProductPageTemplate = ({
  image,
  title,
  heading,
  description,
  products
}) => (
  <div className="product-page">
    <div
      className="hero full-width-image-container margin-top-0"
      style={{
        backgroundImage: `url(${
          !!image.childImageSharp ? image.childImageSharp.fluid.src : image
        })`
      }}>
      <div className="opaque-overlay"></div>
      <h2 className="has-text-weight-bold is-size-1">
        {title}
      </h2>
    </div>
    <section className="products-container container">
      <div className="products-header">
        <div className="products-header-split">
          <button className="above-filter-button">
            <img src={logo} alt="JB Dillon" />
            <span>Buy 1, Get 2 Free</span>
          </button>
        </div>
        <div className="products-header-split">
          <span className="numbered-products-results">{products.length} Resuts</span>
        </div>
        <div className="products-header-split">
          <select className="products-quick-filter" style={{background: `url(${caretDownLight}) no-repeat 95% 50%`}}>
            <option value="">Best Selling</option>
            <option value="">Price: Low to High</option>
            <option value="">Price: High to Low</option>
            <option value="">Most Relevent</option>
          </select>
        </div>
      </div>
      <div className="products-section">
        <div className="products-filter-container">
          <div className="products-filter-head">
            <img src={hamburgerLogo} alt="Mobile Menu" />
            <span>Filters</span>
          </div>
          <div className="selected-filters">
            <span>No Filters Selected</span>
          </div>
          <div>
            <select className="filter-dropdown" style={{background: `url(${caretDownLight}) no-repeat 95% 50%`}}>
              <option value="">Best Selling</option>
              <option value="">Price: Low to High</option>
              <option value="">Price: High to Low</option>
              <option value="">Most Relevent</option>
            </select>
          </div>
          <div>
            <select className="filter-dropdown" style={{background: `url(${caretDownLight}) no-repeat 95% 50%`}}>
              <option value="">Best Selling</option>
              <option value="">Price: Low to High</option>
              <option value="">Price: High to Low</option>
              <option value="">Most Relevent</option>
            </select>
          </div>
        </div>
        <div className="bc-product-grid bc-product-grid--archive bc-product-grid--3col">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  </div>
);

ProductPageTemplate.propTypes = {
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  title: PropTypes.string,
  heading: PropTypes.string,
  description: PropTypes.string,
  products: PropTypes.array
};

const ProductPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark;
  const products = data.allBigCommerceProducts.nodes;

  return (
    <Layout>
      <ProductPageTemplate
        image={frontmatter.image}
        title={frontmatter.title}
        heading={frontmatter.heading}
        description={frontmatter.description}
        products={products}
      />
    </Layout>
  );
};

ProductPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object
    }),
    allBigCommerceProducts: PropTypes.shape({
      nodes: PropTypes.array
    })
  })
};

export default ProductPage;

export const productPageQuery = graphql`
  query ProductPage($id: String!) {
    allBigCommerceProducts {
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
  }
`;
