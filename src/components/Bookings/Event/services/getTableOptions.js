import React from "react"
import CustomToolbarSelect from "../components/CustomToolbarSelect"

export const getTableOptions = ({ rawBookingInvitee, hasDatePassed }) => {
  return {
    customizedToolbarSelect: ({
      dispatch,
      displayData,
      selectedRows,
      setSelectedRows,
    }) => {
      return (
        <CustomToolbarSelect
          tableDispatch={dispatch}
          displayData={displayData}
          selectedRows={selectedRows}
          setSelectedRows={setSelectedRows}
          rawBookingInvitee={rawBookingInvitee}
          hasDatePassed={hasDatePassed}
        />
      )
    },
    customIsSelectable: ({ rowData }) => {
      return rowData?.[1]?.data === "Cancelled"
    },
    filter: false,
    download: false,
    print: false,
    viewColumns: false,
    selectableRows: "multiple",
  }
}
