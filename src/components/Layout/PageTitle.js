import React from "react"

const PageTitle = ({ title, subtitle }) => {
  return (
    <h2 className="has-text-centered mb-0 has-text-primary mx-2-mobile">
      {title}
      <h4 className="subtitle has-text-grey has-text-centered mt-1 is-size-6 mx-2-mobile">
        {subtitle}
      </h4>
    </h2>
  )
}

export default PageTitle
