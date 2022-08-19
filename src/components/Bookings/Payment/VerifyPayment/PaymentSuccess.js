import React, { useEffect, useState } from "react"

const PaymentSuccess = ({ redirectUrl }) => {
  const [timeRemaining, setTimeRemaining] = useState(5)

  useEffect(() => {
    if (timeRemaining > 1)
      setTimeout(() => {
        setTimeRemaining(timeRemaining - 1)
      }, 1000)
    else window.open(redirectUrl, "_self")
  }, [timeRemaining, redirectUrl])

  return (
    <p className="mt-2">
      Payment completed! If you are not redirected in {timeRemaining} second
      {timeRemaining > 1 ? "s" : ""}, please click{" "}
      <a href={redirectUrl}>this link</a>.
    </p>
  )
}

export default PaymentSuccess
