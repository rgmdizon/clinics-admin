import React, { Fragment } from "react"
import { Link } from "gatsby"
import classNames from "classnames"

const PendingSubmissionButtons = ({
  baseUrl,
  state,
  email,
  constructMailTo,
}) => {
  const mailToParams = constructMailTo({ baseUrl, state })
  return (
    <Fragment>
      <article className="message is-danger">
        <div className="message-body">
          Your request failed to submit. Please click 'Complete Request' and
          re-upload your {baseUrl?.includes("flexmed") ? "receipts and " : ""}
          prescription.
        </div>
      </article>
      <div className="buttons is-centered">
        <Link className="button is-medium">End Session</Link>
        <a
          href={`${email}?subject=${mailToParams.subject}&body=${mailToParams.message}`}
          className={classNames("button is-primary is-medium")}
          target="_blank"
          rel="noopener noreferrer"
        >
          Complete Request
        </a>
      </div>
    </Fragment>
  )
}

export default PendingSubmissionButtons
