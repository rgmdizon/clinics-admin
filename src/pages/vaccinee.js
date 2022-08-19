import React, { useEffect } from "react"
import { navigate } from "gatsby"

export default ({ location }) => {
  useEffect(() => {
    navigate(`/covid/vaccinee/${location?.search}`)
    //eslint-disable-next-line
  }, [])

  return <div></div>
}
