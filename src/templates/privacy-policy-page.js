import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'

export const PrivacyPolicyTemplate = ({
  date,
  title,
  body,
  content,
  contentComponent
}) => {
  const PageContent = contentComponent || Content

  return (
    <div className="privacy-policy">
        <div className="container">
            <h1>Privacy Policy</h1>
            <p className="date">Last Updated: April 15, 2021</p>
            {/* <p className="text">
                This Privacy Policy describes Our policies and procedures on the collection, use and disclosure of Your information when You use the Service and tells You about Your privacy rights and how the law protects You.
            </p>
            <p className="text">
                We use Your Personal data to provide and improve the Service. By using the Service, You agree to the collection and use of information in accordance with this Privacy Policy.
            </p>

            <h2>Interpretation and Definitions</h2>

            <h3>Interpretation</h3>
            <p className="text">
            The words of which the initial letter is capitalized have meanings defined under the following conditions. The following definitions shall have the same meaning regardless of whether they appear in singular or in plural.
            </p>

            <h3>Definitions</h3>
            <p className="text">
                For the purposes of this Privacy Policy:
            </p>

            <ul>
                <li>
                    <span className="bold">Account</span> means a unique account created for You to access our Service or parts of our Service.
                </li>
                <li>
                    <span className="bold">Business</span>, for the purpose of the CCPA (California Consumer Privacy Act), refers to the Company as the legal entity that collects Consumers’ personal information and determines the purposes and means of the processing of Consumers’ personal information, or on behalf of which such information is collected and that alone, or jointly with others, determines the purposes and means of the processing of consumers’ personal information, that does business in the State of California.
                </li>
                <li>
                    <span className="bold">Company</span> (referred to as either “the Company”, “We”, “Us” or “Our” in this Agreement) refers to JB DILLION INC, 3722 Starrs Centre Drive Suite B.
                </li>
                <li>
                    <span className="bold">Consumer</span>, for the purpose of the CCPA (California Consumer Privacy Act), means a natural person who is a California resident. A resident, as defined in the law, includes (1) every individual who is in the USA for other than a temporary or transitory purpose, and (2) every individual who is domiciled in the USA who is outside the USA for a temporary or transitory purpose.
                </li>
                <li>
                    <span className="bold">Cookies</span> are small files that are placed on Your computer, mobile device or any other device by a website, containing the details of Your browsing history on that website among its many uses.
                </li>
                <li>
                    <span className="bold">Country</span> refers to: Ohio, United States
                </li>
                <li>
                    <span className="bold">Device</span> means any device that can access the Service such as a computer, a cellphone or a digital tablet.
                </li>
                <li>
                    <span className="bold">Do Not Track</span> (DNT) is a concept that has been promoted by US regulatory authorities, in particular the U.S. Federal Trade Commission (FTC), for the Internet industry to develop and implement a mechanism for allowing internet users to control the tracking of their online activities across websites.
                </li>
                <li>
                    <span className="bold">Personal Data</span> is any information that relates to an identified or identifiable individual.
                </li>
                <p className="list-text">
                    For the purposes of the CCPA, Personal Data means any information that identifies, relates to, describes or is capable of being associated with, or could reasonably be linked, directly or indirectly, with You.
                </p>
                <li>
                    <span className="bold">Sale</span>, for the purpose of the CCPA (California Consumer Privacy Act), means selling, renting, releasing, disclosing, disseminating, making available, transferring, or otherwise communicating orally, in writing, or by electronic or other means, a Consumer’s Personal information to another business or a third party for monetary or other valuable consideration.
                </li>
                <li>
                    <span className="bold">Service</span> refers to the Website.
                </li>
                <li>
                    <span className="bold">Service Provider</span> means any natural or legal person who processes the data on behalf of the Company. It refers to third-party companies or individuals employed by the Company to facilitate the Service, to provide the Service on behalf of the Company, to perform services related to the Service or to assist the Company in analyzing how the Service is used.
                </li>
                <li>
                    <span className="bold">Third-party Social Media Service</span> refers to any website or any social network website through which a User can log in or create an account to use the Service.
                </li>
                <li>
                    <span className="bold">Usage Data</span> refers to data collected automatically, either generated by the use of the Service or from the Service infrastructure itself (for example, the duration of a page visit).
                </li>
                <li>
                    <span className="bold">Website</span> refers to Boot Factory Outlet, accessible from https://bootfactoryoutlet.com
                </li>
                <li>
                    <span className="bold">You</span> means the individual accessing or using the Service, or the company, or other legal entity on behalf of which such individual is accessing or using the Service, as applicable.
                </li>
            </ul>
            
            <h2>Collecting and Using Your Personal Data</h2>

            <h3>Types of Data Collected</h3>
            <p className="cap-label">Personal Data</p>

            <p className="text">
                While using Our Service, We may ask You to provide Us with certain personally identifiable information that can be used to contact or identify You. Personally identifiable information may include, but is not limited to:
            </p>

            <ul>
                <li>Email address</li>
                <li>First name and last name</li>
                <li>Phone number</li>
                <li>Address, State, Province, ZIP/Postal code, City</li>
                <li>Usage Data</li>
            </ul>

            <p className="cap-label">Usage Data</p>
            <p className="text">
                Usage Data is collected automatically when using the Service.
            </p>
            <p className="text">
                Usage Data may include information such as Your Device’s Internet Protocol address (e.g. IP address), browser type, browser version, the pages of our Service that You visit, the time and date of Your visit, the time spent on those pages, unique device identifiers and other diagnostic data.
            </p>
            <p className="text">
                When You access the Service by or through a mobile device, We may collect certain information automatically, including, but not limited to, the type of mobile device You use, Your mobile device unique ID, the IP address of Your mobile device, Your mobile operating system, the type of mobile Internet browser You use, unique device identifiers and other diagnostic data.
            </p>
            <p className="text">
                We may also collect information that Your browser sends whenever You visit our Service or when You access the Service by or through a mobile device.
            </p>

            <p className="cap-label">Tracking Technologies and Cookies</p>
            <p className="text">
                We use Cookies and similar tracking technologies to track the activity on Our Service and store certain information. Tracking technologies used are beacons, tags, and scripts to collect and track information and to improve and analyze Our Service.
            </p>
            <p className="text">
                You can instruct Your browser to refuse all Cookies or to indicate when a Cookie is being sent. However, if You do not accept Cookies, You may not be able to use some parts of our Service.
            </p>
            <p className="text">
                Cookies can be “Persistent” or “Session” Cookies. Persistent Cookies remain on your personal computer or mobile device when You go offline, while Session Cookies are deleted as soon as You close your web browser. Learn more about cookies: All About Cookies.
            </p>
            <p className="text">
                We use both session and persistent Cookies for the purposes set out below:
            </p>
            <ul className="bolded-list-items">
                <li>Necessary / Essential Cookies</li>
                <p className="list-text">
                    Type: Session Cookies
                </p>
                <p className="list-text">
                    Administered by: Us
                </p>
                <p className="list-text">
                    Purpose: These Cookies are essential to provide You with services available through the Website and to enable You to use some of its features. They help to authenticate users and prevent fraudulent use of user accounts. Without these Cookies, the services that You have asked for cannot be provided, and We only use these Cookies to provide You with those services.
                </p>
                <li>Cookies Policy / Notice Acceptance Cookies</li>
                <p className="list-text">
                    Type: Persistent Cookies
                </p>
                <p className="list-text">
                    Administered by: Us
                </p>
                <p className="list-text">
                    Purpose: These Cookies identify if users have accepted the use of cookies on the Website.
                </p>
                <li>Functionality Cookies</li>
                <p className="list-text">
                    Type: Persistent Cookies
                </p>
                <p className="list-text">
                    Administered by: Us
                </p>
                <p className="list-text">
                    Purpose: These Cookies allow us to remember choices You make when You use the Website, such as remembering your login details or language preference. The purpose of these Cookies is to provide You with a more personal experience and to avoid You having to re-enter your preferences every time You use the Website.
                </p>
                <li>Tracking and Performance Cookies</li>
                <p className="list-text">
                    Type: Persistent Cookies
                </p>
                <p className="list-text">
                    Administered by: Third-Parties
                </p>
                <p className="list-text">
                    Purpose: These Cookies are used to track information about traffic to the Website and how users use the Website. The information gathered via these Cookies may directly or indirectly identify you as an individual visitor. This is because the information collected is typically linked to a pseudonymous identifier associated with the device you use to access the Website. We may also use these Cookies to test new advertisements, pages, features or new functionality of the Website to see how our users react to them.
                </p>
                <li>Targeting and Advertising Cookies</li>
                <p className="list-text">
                    Type: Persistent Cookies
                </p>
                <p className="list-text">
                    Administered by: Third-Parties
                </p>
                <p className="list-text">
                    Purpose: These Cookies track your browsing habits to enable Us to show advertising which is more likely to be of interest to You. These Cookies use information about your browsing history to group You with other users who have similar interests. Based on that information, and with Our permission, third party advertisers can place Cookies to enable them to show adverts which We think will be relevant to your interests while You are on third party websites.
                </p>
            </ul>
            <p className="text">
                For more information about the cookies we use and your choices regarding cookies, please visit our Cookies Policy or the Cookies section of our Privacy Policy.
            </p>

            <h3>Use of Your Personal Data</h3>
            <p className="text">The Company may use Personal Data for the following purposes:</p>

            <ul>
                <li>
                    <span className="bold">To provide and maintain our Service,</span> including to monitor the usage of our Service.
                </li>
                <li>
                    <span className="bold">To manage Your Account:</span> to manage Your registration as a user of the Service. The Personal Data You provide can give You access to different functionalities of the Service that are available to You as a registered user.
                </li>
                <li>
                    <span className="bold">For the performance of a contract:</span> the development, compliance and undertaking of the purchase contract for the products, items or services You have purchased or of any other contract with Us through the Service.
                </li>
                <li>
                    <span className="bold">To contact You:</span> To contact You by email, telephone calls, SMS, or other equivalent forms of electronic communication, such as a mobile application’s push notifications regarding updates or informative communications related to the functionalities, products or contracted services, including the security updates, when necessary or reasonable for their implementation.
                </li>
                <li>
                    <span className="bold">To provide You with news,</span> special offers and general information about other goods, services and events which we offer that are similar to those that you have already purchased or enquired about unless You have opted not to receive such information.
                </li>
                <li>
                    <span className="bold">To manage Your requests:</span> To attend and manage Your requests to Us.
                </li>
            </ul>
            <p className="text">
                We may share your personal information in the following situations:
            </p>
            <ul>
                <li>
                    <span className="bold">With Service Providers:</span> We may share Your personal information with Service Providers to monitor and analyze the use of our Service, to show advertisements to You to help support and maintain Our Service, to advertise on third party websites to You after You visited our Service, for payment processing,to contact You.
                </li>
                <li>
                    <span className="bold">For Business transfers:</span> We may share or transfer Your personal information in connection with, or during negotiations of, any merger, sale of Company assets, financing, or acquisition of all or a portion of our business to another company.
                </li>
                <li>
                    <span className="bold">With Affiliates:</span> We may share Your information with Our affiliates, in which case we will require those affiliates to honor this Privacy Policy. Affiliates include Our parent company and any other subsidiaries, joint venture partners or other companies that We control or that are under common control with Us.
                </li>
                <li>
                    <span className="bold">With Business partners:</span> We may share Your information with Our business partners to offer You certain products, services or promotions.
                </li>
                <li>
                    <span className="bold">With other users:</span> when You share personal information or otherwise interact in the public areas with other users, such information may be viewed by all users and may be publicly distributed outside. If You interact with other users or register through a Third-Party Social Media Service, Your contacts on the Third-Party Social Media Service may see Your name, profile, pictures and description of Your activity. Similarly, other users will be able to view descriptions of Your activity, communicate with You and view Your profile.
                </li>
            </ul>

            <h3>Retention of Your Personal Data</h3>
            <p className="text">
                The Company will retain Your Personal Data only for as long as is necessary for the purposes set out in this Privacy Policy. We will retain and use Your Personal Data to the extent necessary to comply with our legal obligations (for example, if we are required to retain your data to comply with applicable laws), resolve disputes, and enforce our legal agreements and policies.
            </p>
            <p className="text">
                The Company will also retain Usage Data for internal analysis purposes. Usage Data is generally retained for a shorter period of time, except when this data is used to strengthen the security or to improve the functionality of Our Service, or We are legally obligated to retain this data for longer time periods.
            </p>

            <h3>Transfer of Your Personal Data</h3>
            <p className="text">
                Your information, including Personal Data, is processed at the Company’s operating offices and in any other places where the parties involved in the processing are located. It means that this information may be transferred to — and maintained on — computers located outside of Your state, province, country or other governmental jurisdiction where the data protection laws may differ than those from Your jurisdiction.
            </p>
            <p className="text">
                Your consent to this Privacy Policy followed by Your submission of such information represents Your agreement to that transfer.
            </p>
            <p className="text">
                The Company will take all steps reasonably necessary to ensure that Your data is treated securely and in accordance with this Privacy Policy and no transfer of Your Personal Data will take place to an organization or a country unless there are adequate controls in place including the security of Your data and other personal information.
            </p>

            <h3>Disclosure of Your Personal Data</h3>
            <p className="cap-label">Business Transactions</p>
            <p className="text">
                If the Company is involved in a merger, acquisition or asset sale, Your Personal Data may be transferred. We will provide notice before Your Personal Data is transferred and becomes subject to a different Privacy Policy.
            </p>

            <p className="cap-label">Law Enforcement</p>
            <p className="text">
                Under certain circumstances, the Company may be required to disclose Your Personal Data if required to do so by law or in response to valid requests by public authorities (e.g. a court or a government agency).            
            </p>

            <p className="cap-label">Other legal requirements</p>
            <p className="text">
                The Company may disclose Your Personal Data in the good faith belief that such action is necessary to:
            </p>

            <ul>
                <li>Comply with a legal obligation</li>
                <li>Protect and defend the rights or property of the Company</li>
                <li>Prevent or investigate possible wrongdoing in connection with the Service</li>
                <li>Protect the personal safety of Users of the Service or the public</li>
                <li>Protect against legal liability</li>
            </ul>

            <h3>Security of Your Personal Data</h3>
            <p className="text">
                If the Company is involved in a merger, acquisition or asset sale, Your Personal Data may be transferred. We will provide notice before Your Personal Data is transferred and becomes subject to a different Privacy Policy.
            </p>

            <h3>Detailed Information on the Processing of Your Personal Data</h3>
            <p className="text">
                Service Providers have access to Your Personal Data only to perform their tasks on Our behalf and are obligated not to disclose or use it for any other purpose.
            </p>

            <h3>Analytics</h3>
            <p className="text">
                We may use third-party Service providers to monitor and analyze the use of our Service.
            </p>

            <ul className="bolded-list-items">
                <li>Google Analytics</li>
                <p className="list-text">
                    Google Analytics is a web analytics service offered by Google that tracks and reports website traffic. Google uses the data collected to track and monitor the use of our Service. This data is shared with other Google services. Google may use the collected data to contextualize and personalize the ads of its own advertising network.
                </p>
                <p className="list-text">
                    You can opt-out of having made your activity on the Service available to Google Analytics by installing the Google Analytics opt-out browser add-on. The add-on prevents the Google Analytics JavaScript (ga.js, analytics.js and dc.js) from sharing information with Google Analytics about visits activity.
                </p>
                <p className="list-text">
                    For more information on the privacy practices of Google, please visit the Google Privacy & Terms web page: https://policies.google.com/privacy
                </p>
            </ul>

            <h3>Advertising</h3> */}

        </div>
    </div>
  )
}

PrivacyPolicyTemplate.propTypes = {
  date: PropTypes.string,
  body: PropTypes.string,
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
  contentComponent: PropTypes.func,
}

const PrivacyPolicyPage = ({ data }) => {
  const { markdownRemark: post } = data

  return (
    <Layout>
      <PrivacyPolicyTemplate
        image={post.frontmatter.image}
        contentComponent={HTMLContent}
        title={post.frontmatter.title}
        content={post.html}
      />
    </Layout>
  )
}

PrivacyPolicyPage.propTypes = {
  data: PropTypes.object.isRequired,
}

export default PrivacyPolicyPage

export const privacyPolicyPageQuery = graphql`
  query PrivacyPolicyPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
        date
        bodyContent
      }
    }
  }
`
