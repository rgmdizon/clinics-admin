import React from "react"
import classNames from "classnames"

import Container from "./Container"
import ActionButtons from "../Elements/ActionButtons"

// import styles from "./utils/layout.module.scss"

const CartLayout = (props) => (
  <Container {...props}>
    <div className="columns is-centered">
      <div className="column pb-0-mobile is-7">{props.children}</div>
      <div
        className={classNames(
          "column"
          // "column is-hidden-mobile",
          // styles["cart__containerIsHiddenTablet"]
        )}
      >
        {props.cartContainer}
      </div>
    </div>
    <ActionButtons {...props} />
  </Container>
)

export default CartLayout
