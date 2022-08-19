import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import Img from "gatsby-image"

import Container from "layout/Container"

const Footer = () => {
  const currentYear = new Date().getFullYear()
  const data = useStaticQuery(graphql`
    {
      logoLong: file(relativePath: { eq: "logos/medgrocer-long.png" }) {
        childImageSharp {
          fixed(height: 25) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  `)

  const logoLong = data.logoLong.childImageSharp.fixed

  return (
    <footer className="footer px-1">
      <Container isCentered mobile={12} tablet={10} desktop={10} fullhd={8}>
        <div className="columns is-centered">
          <div className="column is-6 pl-0 pr-2">
            <Link to="/">
              <Img fixed={logoLong} />
            </Link>
            <p className="help">
            MedGrocer's digitally-enabled corporate healthcare solutions and patient programs empower our customers to get their medicines, vaccines, and teleconsultations conveniently, cost-effectively, and intelligently.
            </p>
            <p className="help pt-1">
            Every year, we serve over one million Filipinos either directly or through partnerships with employers and pharmaceutical companies.
            </p>

            <p className="help pt-1">
              © {currentYear}, MedGrocer · MedGrocer (MG Health Solutions, Inc.)
            </p>
          </div>

          {/* {sitemap.map((section, index) => (
            <div
              className={classNames(section.classnames, "column is-2 pl-0")}
              key={index}
            >
              <h5 className="mt-0 has-text-primary">{section.section}</h5>
              {section.links.map((link) => (
                <Link
                  to={`/${link.url}`}
                  className="help has-text-dark"
                  key={link.url}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          ))} */}
        </div>
      </Container>
    </footer>
  )
}

export default Footer
