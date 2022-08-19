import React from "react"
import moment from "moment"

import Loading from "elements/Loading"
import DatatableRow from "../components/DatatableRow"

export const getTableOptions = (options) => ({
  filterType: "checkbox",
  selectableRows: false,
  textLabels: {
    body: {
      noMatch: options?.isLoading ? (
        <Loading color="#0D6D6E" size="10" />
      ) : (
        "Sorry, there is no matching data to display"
      ),
    },
  },
  rowsSelected: options?.state?.selectedRows,
  customToolbarSelect: (selectedRows, displayData, setSelectedRows) => {
    if (options?.customizedToolbarSelect)
      return options?.customizedToolbarSelect({
        displayData,
        selectedRows,
        setSelectedRows,
        dispatch: options?.dispatch,
      })
  },
  onRowSelectionChange: (_, __, allRowsSelected) => {
    let rowsToBeSelected = allRowsSelected
    rowsToBeSelected = rowsToBeSelected.filter((index) => {
      return !options?.state?.disabledSectionRows?.includes(index)
    })

    options.dispatch({
      type: "SET_SELECTED_ROW",
      payload: rowsToBeSelected,
    })
  },
  customSort: (data, columnIndex, order) => {
    let isColumnADate = false

    return data.sort((a, b) => {
      let firstData = a?.data?.[columnIndex]?.data || a?.data?.[columnIndex]
      let secondData = b?.data?.[columnIndex]?.data || b?.data?.[columnIndex]

      // Get date instead of data if type is date
      if (a?.data?.[columnIndex]?.type === "date") {
        firstData = a?.data?.[columnIndex]?.date
        isColumnADate = true
      }
      if (b?.data?.[columnIndex]?.type === "date")
        secondData = b?.data?.[columnIndex]?.date

      if (isColumnADate)
        return (
          (moment(firstData) < moment(secondData) ? 1 : -1) *
          (order === "desc" ? 1 : -1)
        )

      return (firstData < secondData ? 1 : -1) * (order === "desc" ? 1 : -1)
    })
  },
  customRowRender: (data, dataIndex, rowIndex) => {
    return (
      <DatatableRow
        state={options?.state}
        dispatch={options?.dispatch}
        isRowSelectable={options?.selectableRows}
        customIsSelectable={options?.customIsSelectable}
        onRowClick={options?.onRowClick}
        rowData={data}
        dataIndex={dataIndex}
        rowIndex={rowIndex}
      />
    )
  },
})
