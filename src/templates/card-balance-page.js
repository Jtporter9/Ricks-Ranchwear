//Node Mdoules
import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';

//Components
import Layout from '../components/Layout';
import CardBalanceForm from "src/components/card/balance/CheckBalanceForm";

//Contexts
import {ContentProvider} from '../context/ContentContextV2';

export const CardBalancePageTemplate = () => (
  <>
    <CardBalanceForm />
  </>
);

CardBalancePageTemplate.propTypes = {
  title: PropTypes.string,
};

const CardBalancePage = ({ data }) => {
    const [content, setContent] = useState({});

    useEffect(() => {
        fetch(`/.netlify/functions/graphCms?page=cardBalancePage`, {
            method: 'GET',
        })
          .then(response => response.json())
          .then(data => setContent(data.data.cardBalancePage))
          .catch(err => console.log(err));
    }, []);

  return (
    <>
        {
            content &&
            Object.keys(content).length &&
            <ContentProvider value={content}>
                <Layout>
                    <CardBalancePageTemplate />
                </Layout>
            </ContentProvider>
        }
    </>
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
