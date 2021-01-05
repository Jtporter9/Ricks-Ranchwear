import React from 'react'
import Layout from '../components/Layout';

export default class MensPage extends React.Component {
    render() {
        return (
            <Layout>
                <section style={{ minHeight: '50vh' }} className="section container">
                    <h1 style={{ 
                        fontWeight: "900",
                        fontSize: "24px",
                        lineHeight: "32px",
                        textAlign: "center",
                        letterSpacing: "0.04em"
                     }}>Kids Page Coming Soon.</h1>
                </section>
            </Layout>
        )
    }
}