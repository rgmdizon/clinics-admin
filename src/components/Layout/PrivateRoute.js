import React, { Fragment, useState, useEffect } from "react"
import { navigate } from "gatsby"

import Loading from "elements/Loading"

import {
  getAuthenticatedUser,
  checkIfUserIsAuthorized,
} from "auth/services/roles"
import { useUserPermissions } from "../Auth/hooks/useUserPermissions"

const PrivateRoute = ({ isPrivate, children }) => {
  let roles = useUserPermissions()
  const [loading, setLoading] = useState(true)
  const [currentUser, setCurrentUser] = useState(null)

  useEffect(() => {
    if (!!isPrivate) {
      setCurrentUser(getAuthenticatedUser(roles))
      setLoading(false)
    }
    //eslint-disable-next-line
  }, [])

  if (!!isPrivate) {
    if (currentUser) {
      if (checkIfUserIsAuthorized(currentUser?.allowedPaths))
        return <Fragment>{children}</Fragment>
      else navigate("/register")
    }
    if (currentUser && !currentUser?.allowedPaths) navigate("/sign-in")
    if (!currentUser && !loading) navigate("/sign-in")

    return (
      <Fragment>
        <Loading isFullscreen />
      </Fragment>
    )
  } else return <Fragment>{children}</Fragment>
}

export default PrivateRoute
