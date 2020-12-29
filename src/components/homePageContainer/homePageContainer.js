import React, { useState } from 'react';
import { Link, graphql } from 'gatsby';

import PhotoGrid from '../PhotoGrid';
import BlogItem from '../BlogItem';

export default function HomePageContainer({
    image,
    title,
    subtitle,
    heading,
    mainpitch,
    bigimage,
    description,
    intro,
    post
}) {

    return (
        <div>
        <div
          className="full-width-image margin-top-0"
          style={{
            backgroundImage: `url(${
              !!image.childImageSharp ? image.childImageSharp.fluid.src : image
            })`,
            backgroundPosition: `top left`,
            backgroundAttachment: `fixed`
          }}>
          <div
            style={{
              display: 'flex',
              height: '150px',
              lineHeight: '1',
              justifyContent: 'space-around',
              alignItems: 'left',
              flexDirection: 'column'
            }}>
            <h1
              className="has-text-weight-bold is-size-3-mobile is-size-2-tablet is-size-1-widescreen"
              style={{
                boxShadow:
                  'rgba(0, 0, 0, 0.75) 0.5rem 0px 0px, rgba(0, 0, 0, 0.75) -0.5rem 0px 0px',
                backgroundColor: 'rgba(0, 0, 0, 0.75)',
                color: 'white',
                lineHeight: '1',
                padding: '0.25em'
              }}>
              {title}
            </h1>
            <h3
              className="has-text-weight-bold is-size-5-mobile is-size-5-tablet is-size-4-widescreen"
              style={{
                boxShadow:
                  'rgba(0, 0, 0, 0.75) 0.5rem 0px 0px, rgba(0, 0, 0, 0.75) -0.5rem 0px 0px',
                backgroundColor: 'rgba(0, 0, 0, 0.75)',
                color: 'white',
                lineHeight: '1',
                padding: '0.25em'
              }}>
              {subtitle}
            </h3>
          </div>
        </div>
    
        <section className="section section--gradient">
          <div className="container">
            <div className="section">
              <div className="columns">
                <div className="column is-10 is-offset-1">
                  <div className="content">
                    <div className="content">
                      <div className="tile">
                        <h3 className="subtitle">{mainpitch.description}</h3>
                      </div>
                    </div>
                    
                    <section className="section">
                      <div className="container has-text-centered">
                        <div className="block">
                          <img src={bigimage.image.publicURL} alt={bigimage.alt} />
                        </div>
                        
                        <PhotoGrid gridItems={intro.blurbs} />
                        
                        <h4 className="title is-spaced is-4">{intro.heading}</h4>
                        <p className="subtitle">{intro.description}</p>
                      </div>
                    </section>
                    
                    <div className="columns">
                      <div className="column is-12 has-text-centered">
                        <Link className="btn" to="/products">
                          See all products
                        </Link>
                      </div>
                    </div>
                    <div className="column is-12">
                      <BlogItem post={post} columnWidth="is-12" />
                      <div className="column is-12 has-text-centered">
                        <Link className="btn" to="/blog">
                          Read more
                        </Link> 
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    )
}
