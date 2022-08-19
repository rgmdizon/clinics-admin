import React, { useState, useEffect } from "react"

// import subjects from "../utils/emailSubjects.json"
// import { sendInquiry } from "../services/inquiry"

const CONTACT_US_EMAIL = "concentrix-mind@medgrocer.com"

const ContactUs = ({ module }) => {
  // const data = useStaticQuery(graphql`
  //   {
  //     complete: file(relativePath: { eq: "icons/email.png" }) {
  //       childImageSharp {
  //         fluid(maxWidth: 250) {
  //           ...GatsbyImageSharpFluid
  //         }
  //       }
  //     }
  //   }
  // `)
  const [notification, setNotification] = useState({
    message: "",
    active: false,
  })

  // useEffect(() => {
  //   setEmailSubjects(subjects.map((item) => ({ value: item, label: item })))
  // }, [])

  useEffect(() => {
    if (notification.active)
      setTimeout(() => {
        closeNotification()
      }, 5000)
  }, [notification])

  const closeNotification = () => {
    setNotification({ message: "", active: false, type: "" })
  }

  // const handleSubmit = (values, { resetForm }) => {
  //   setLoading(true)
  //   sendInquiry(
  //     values,
  //     () => {
  //       resetForm()
  //       setLoading(false)
  //       setNotification({
  //         active: true,
  //         type: "success",
  //         message:
  //           "Thank you for your inquiry! We'll get back to you within 24 hours.",
  //       })
  //     },
  //     () => {
  //       setLoading(false)
  //       setNotification({
  //         active: true,
  //         type: "danger",
  //         message:
  //           "Something went wrong with sending your email. Please try again.",
  //       })
  //     },
  //     module.name
  //   )
  // }

  return (
    <section id="contact-us">
      <h2>Contact us</h2>
      <hr />
      <div className="message">
        <div className="message-body">
          If you have questions or are experiencing problems not found in our
          Help Center, let us know by emailing us at{" "}
          <a
            href={`mailto:${CONTACT_US_EMAIL}`}
            className="has-text-weight-bold has-text-primary"
          >
            {CONTACT_US_EMAIL}
          </a>
          .
        </div>
      </div>
    </section>
  )
}

export default ContactUs
