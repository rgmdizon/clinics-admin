import React, { useState, useEffect, useContext } from "react"
import { Link, navigate } from "gatsby"
import { Formik, Form } from "formik"
import classNames from "classnames"

import Layout from "layout"
import Container from "layout/Container"
import Button from "elements/Button"
import Card from "elements/Card"
import Message from "elements/Message"

import AuthForm from "./AuthForm"

import { isBrowser } from "services/general"
import { parseForm } from "../../services/form"
import { AppContext } from "context/AppContext"
import { hasSignedInUser } from "./services/user"
import { handleAuthSubmit } from "./services/auth"
import { generateInitialValues } from "services/context"

const Auth = ({ pageContext, location }) => {
  const [message, setMessage] = useState({})
  const [loading, setLoading] = useState(false)
  const { state, dispatch } = useContext(AppContext)
  let isUserVerified = state?.auth?.hasBeenVerified

  let { module, formFields } = pageContext
  let { validationSchema } = parseForm({
    formFields: formFields?.filter((field) =>
      field.inclusions.includes(module.name)
    ),
  })

  let initialValues = {
    ...generateInitialValues({ fields: formFields }),
    ...state?.auth,
  }

  const handleSubmit = (values, { resetForm }) => {
    setMessage({})
    setLoading(true)

    let payload = {
      values,
      resetForm,
      setMessage,
      setLoading,
      module: module.name,
    }
    handleAuthSubmit({ payload, state, dispatch, location })
  }

  useEffect(() => {
    if (isBrowser()) {
      if (hasSignedInUser()) navigate("/register")

      if (!isUserVerified && module.name === "sign-up")
        navigate("/verify-email")
      if (isUserVerified && module.name === "sign-in") {
        setMessage({
          type: "danger",
          content:
            "This email is already a registered MedGrocer account. Please sign in using these credentials.",
        })

        dispatch({ type: "RESET_DETAILS" })
      }
    }
  }, [isUserVerified, module.name, dispatch])

  return (
    <Layout
      background="light-teal"
      seoTitle={module.seoTitle}
      display={{ footer: true, helpCenterBanner: false }}
    >
      <Container isCentered tablet={8} desktop={6} fullhd={4}>
        <Card
          className="my-3"
          title={module?.title}
          subtitle={module?.subtitle}
        >
          <div className="is-flex is-justify-content-center">
            <div className={classNames("px-1 mt-3 mb-2")}>
              <Formik
                onSubmit={handleSubmit}
                initialValues={initialValues}
                validationSchema={validationSchema}
              >
                {({ values }) => (
                  <Form>
                    <Message color="info">
                      <p>
                        This website is used by MedGrocer’s corporate partners
                        to enroll vaccinees for COVID-19 vaccination. If you are
                        an individual vaccinee, you are not expected to use this
                        website. Once a corporate partner has enrolled
                        individual vaccinees, individual vaccinees must complete
                        their registration by checking their email for
                        instructions.
                      </p>
                    </Message>
                    <AuthForm
                      formFields={formFields}
                      module={module.name}
                      values={values}
                    />
                    {module.name === "sign-in" && (
                      <p className="is-size-6 pb-1 pt-0">
                        <Link to="/forgot-password">Reset password</Link>
                      </p>
                    )}
                    {message?.content && (
                      <Message color={message?.type}>
                        <p>{message?.content?.message || message?.content}</p>
                      </Message>
                    )}
                    <Button
                      type="submit"
                      color="primary"
                      disabled={loading}
                      className={classNames("mt-2", { "is-loading": loading })}
                      isFullwidth
                    >
                      {module.cta}
                    </Button>
                    {module.name === "sign-in" && (
                      <section>
                        <p className="has-text-centered is-size-6 pt-1">
                          Don't have an account yet?{" "}
                          <Link
                            to="/verify-email"
                            className="has-text-weight-bold"
                          >
                            Create Account
                          </Link>
                          .
                        </p>
                      </section>
                    )}
                    {module.name !== "sign-in" && (
                      <section>
                        <p className="has-text-centered is-size-7 pt-1">
                          By signing up, you agree to our{" "}
                          <Link
                            to={`/terms-and-conditions`}
                            className="has-text-weight-bold"
                          >
                            Terms and Conditions
                          </Link>{" "}
                          and{" "}
                          <Link
                            to={`/privacy-policy`}
                            className="has-text-weight-bold"
                          >
                            Privacy Policy
                          </Link>
                        </p>
                        <p className="has-text-centered is-size-6 mt-2">
                          Already have an account?{" "}
                          <Link to="/sign-in" className="has-text-weight-bold">
                            Sign In
                          </Link>
                          .
                        </p>
                      </section>
                    )}
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </Card>
      </Container>
    </Layout>
  )
}

export default Auth
