import React, { Fragment } from "react"
import Img from "gatsby-image"
// import classNames from "classnames"

import Hero from "layout/Hero"
import Container from "layout/Container"
import Message from "elements/Message"
import Media from "elements/Media"
import MediaBox from "elements/MediaBox"

// import styles from "../utils/staticPages.module.scss"
import useHomeImages from "../hooks/useHomeImages"
import fluSymptoms from "../utils/fluSymptoms.json"
import fluWhoToVaccinate from "../utils/fluWhoToVaccinate.json"

const HomeFlu = () => {
  const data = useHomeImages()

  return (
    <Fragment>
      <Hero size="medium">
        <Container isCentered={true} className="content">
          <div className="columns is-align-items-center">
            <div className="column has-text-centered">
              <Img fixed={data.flu.childImageSharp.fixed} alt="Flu" />
            </div>
            <div className="column content is-8 mb-2">
              <p className="is-size-5">
                Flu is a highly <b>contagious respiratory illness</b> primarily
                caused by the influenza virus. It affects the nose, throat, and
                lungs and can easily spread through sneezing, coughing, or
                talking. Usually peaking during the rainy season,{" "}
                <b>
                  an annual flu vaccine is the best way to help protect you
                  against flu all year long
                </b>
                .
              </p>
            </div>
          </div>
          {/* <div className={classNames(styles["card"])}>
            <div className="card-content">
              <div className="columns">
                <div className="column content">
                  <h1 className="has-text-primary has-text-weight-bold is-size-3-desktop is-size-5-mobile">
                    Trivalent Flu Vaccine
                  </h1>
                  <ul>
                    <li>
                      Protects against <b>three</b> flu strains
                    </li>
                    <li>
                      <b>Sufficient</b> protection from flu
                    </li>
                  </ul>
                </div>
                <div className="column content">
                  <h1 className="has-text-primary has-text-weight-bold is-size-3-desktop is-size-5-mobile">
                    Quadrivalent Flu Vaccine
                  </h1>
                  <ul>
                    <li>
                      Protects against <b>four</b> flu strains
                    </li>
                    <li>
                      <b>Expanded</b> protection from flu
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div> */}
        </Container>
      </Hero>
      <Hero size="small" color="light">
        <Container isCentered={true}>
          <h1 className="has-text-primary has-text-weight-bold is-size-3-desktop is-size-5-mobile has-text-centered mb-2">
            Symptoms
          </h1>
          <div className="columns">
            {fluSymptoms.map((symptom) => (
              <MediaBox
                image={{ src: data[symptom.image].childImageSharp.fixed.src }}
                title={symptom.title}
              />
            ))}
          </div>
        </Container>
      </Hero>
      <Hero isCentered={true}>
        <div className="columns">
          <div className="column is-4-desktop is-4-fullhd is-6-tablet is-12-mobile is-offset-2-fullhd is-offset-2-desktop">
            <h1 className="has-text-primary has-text-weight-bold is-size-3-desktop is-size-5-mobile">
              Vaccinate Against Flu
            </h1>
            <div className="content has-text-left">
              <p className="is-size-4-desktop is-size-12-mobile">
                Flu viruses change yearly and immunity declines over time.
                <b> It is important to get vaccinated yearly</b>.
              </p>
              <p className="is-size-4-desktop is-size-6-mobile is-size-12-mobile">
                <ul>
                  <li>Wear a face mask</li>
                  <li>Regularly wash hands</li>
                  <li>Cover when you cough or sneeze</li>
                  <li>Avoid close contact with sick people</li>
                </ul>
              </p>
            </div>
          </div>
          <div className="column is-4-desktop is-4-fullhd is-6-tablet is-12-mobile">
            <h1 className="has-text-secondary has-text-weight-bold is-size-3-desktop is-size-5-mobile">
              Who should get vaccinated?
            </h1>
            <div className="content has-text-left">
              <p className="is-size-4-desktop is-size-6-mobile is-size-12-mobile">
                Everyone, but especially for:
              </p>
              <p className="is-size-4-desktop is-size-6-mobile is-size-12-mobile">
                {fluWhoToVaccinate.map((people) => (
                  <Media
                    image={{
                      src: data[people.image].childImageSharp.fixed.src,
                      alt: people.title,
                    }}
                  >
                    {people.title}
                  </Media>
                ))}
              </p>
            </div>
          </div>
        </div>
        <Message className="mx-7-desktop">
          Do not take this vaccine if you have a chicken or egg allergy, or if
          you currently have high fever.
        </Message>
      </Hero>
    </Fragment>
  )
}

export default HomeFlu
