import React, { useEffect } from "react"
import Message from "elements/Message"

import { formatNumber } from "services/formatting"

const AllocationErrorMessage = ({ config, setFieldError }) => {
  const { brand, remainingAllocation } = config
  const formattedRemainingAllocation = formatNumber({
    number: remainingAllocation,
  })
  useEffect(() => {
    setFieldError(
      "numberOfDoses",
      `You have exceeded your allocations for ${brand}. Remaining ${brand} ${" "}
      allocations: ${formattedRemainingAllocation}.`
    )
    //eslint-disable-next-line
  }, [])
  return (
    <Message color="danger">
      <p>
        You have exceeded your allocations for {brand}. Remaining {brand}{" "}
        allocations: {formattedRemainingAllocation}.
      </p>
    </Message>
  )
}

export default AllocationErrorMessage
