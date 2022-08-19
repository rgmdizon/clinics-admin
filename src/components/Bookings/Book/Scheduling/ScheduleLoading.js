import React from "react"
import Loading from "elements/Loading"

const ScheduleLoading = () => {
  return (
    <div className="my-2">
      <Loading size="5" isFullscreen={false} />
      <p className="has-text-grey has-text-centered">
        Loading available schedules.
      </p>
    </div>
  )
}

export default ScheduleLoading
