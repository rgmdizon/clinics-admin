import React, { useState, useEffect } from "react"
import Img from "gatsby-image"
import { useStaticQuery, graphql } from "gatsby"

const ScreeningCountdown = ({ setView }) => {
  const [timeRemaining, setTimeRemaining] = useState(5)

  const data = useStaticQuery(graphql`
    {
      complete: file(relativePath: { eq: "icons/check.png" }) {
        childImageSharp {
          fixed(width: 128) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  `)
  const complete = data.complete.childImageSharp.fixed

  const handleRedirect = () => setView("qr")

  useEffect(() => {
    if (timeRemaining > 1) {
      setInterval(() => {
        setTimeRemaining(timeRemaining - 1)
      }, 1000)
    } else handleRedirect()

    //eslint-disable-next-line
  }, [timeRemaining])

  return (
    <div>
      <div className="mt-5 has-text-centered">
        <Img fixed={complete} alt="Success!" />
        <p className="mt-3">
          Screening complete, you will be automatically redirected back to scan
          QR page in{" "}
          <span className="has-text-weight-bold has-text-primary">
            {timeRemaining}
          </span>{" "}
          seconds.
        </p>
        <p className="mt-1">
          If you are not redirected, please click the button below.
        </p>
        <button
          className="mt-2 mb-5 button is-medium is-primary"
          onClick={handleRedirect}
        >
          Back to QR scanner
        </button>
      </div>
    </div>
  )
}

export default ScreeningCountdown
