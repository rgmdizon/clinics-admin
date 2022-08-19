import React, { Fragment } from "react"
import { navigate } from "gatsby"
import classNames from "classnames"

import Button from "./Button"

const ResponsiveActionButtons = ({ isMobile, submit, next, back }) => (
  <Fragment>
    {back && (
      <Button
        onClick={() => {
          if (back.callback) {
            back.callback()
            return
          }
          navigate(back.link, { state: back?.state })
        }}
        className={classNames("px-2 px-2-mobile mr-1 mr-1-mobile", {
          "is-hidden-desktop is-hidden-tablet": !!isMobile,
          "is-hidden-mobile": !isMobile,
        })}
        size={isMobile ? "regular" : "medium"}
      >
        {back.label}
      </Button>
    )}

    {next && (
      <Button
        onClick={() => {
          if (next.callback) {
            next.callback()
            return
          }
          if (next?.link) navigate(next.link)
        }}
        className={classNames("px-2 px-2-mobile mr-1 mr-1-mobile", {
          "is-hidden-desktop is-hidden-tablet": !!isMobile,
          "is-hidden-mobile": !isMobile,
        })}
        isLoading={next.loading}
        size={isMobile ? "regular" : "medium"}
        color="primary"
        isDisabled={next.disabled}
      >
        {next.label}
      </Button>
    )}

    {submit && (
      <Button
        className={classNames("px-2 px-2-mobile mr-1 mr-1-mobile", {
          "is-hidden-desktop is-hidden-tablet": !!isMobile,
          "is-hidden-mobile": !isMobile,
        })}
        size={isMobile ? "regular" : "medium"}
        color="primary"
        type="submit"
        isLoading={submit.loading}
        isDisabled={submit.disabled}
        onClick={() => submit.link && navigate(submit.link)}
      >
        {submit.label}
      </Button>
    )}
  </Fragment>
)

const ActionButtons = ({ submit, next, back }) => (
  <div className="buttons is-centered">
    <ResponsiveActionButtons submit={submit} next={next} back={back} />
    <ResponsiveActionButtons isMobile submit={submit} next={next} back={back} />
  </div>
)

export default ActionButtons
