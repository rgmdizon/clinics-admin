import React, { Fragment, useEffect } from "react"
import Checkbox from "@mui/material/Checkbox"
import classNames from "classnames"

import styles from "../../utils/elements.module.scss"

const DataRenderer = ({ data }) => {
  switch (data?.type) {
    case "component":
      return <Fragment>{data?.data}</Fragment>
    case "string":
      return <span>{data?.data || data}</span>
    case "tag":
      return (
        <span class={`tag is-${data?.color || "primary"}`}>
          {data?.data || data}
        </span>
      )
    default:
      return <span>{data?.data || data}</span>
  }
}

const DatatableRow = ({
  state,
  rowData,
  dispatch,
  dataIndex,
  onRowClick,
  isRowSelectable,
  customIsSelectable,
}) => {
  let handleRowClick = () => {
    onRowClick(rowData)
  }

  const handleSelectRow = () => {
    let selectedRows = state?.selectedRows

    if (selectedRows.includes(dataIndex)) {
      let index = selectedRows.indexOf(dataIndex)
      selectedRows.splice(index, 1)
    } else {
      selectedRows = [...selectedRows, dataIndex]
    }

    dispatch({
      type: "SET_SELECTED_ROW",
      payload: selectedRows,
    })
  }

  let checkBoxProperties = {
    checked: state?.selectedRows?.includes(dataIndex),
    onChange: handleSelectRow,
  }

  if (customIsSelectable)
    if (customIsSelectable({ rowData })) checkBoxProperties.disabled = true

  useEffect(() => {
    if (
      !state?.disabledSectionRows?.includes(dataIndex) &&
      customIsSelectable &&
      customIsSelectable({ rowData })
    )
      dispatch({
        type: "SET_DISABLED_ROWS",
        payload: dataIndex,
      })

    //eslint-disable-next-line
  }, [])

  return (
    <tr
      className={classNames(styles["datatable__row"])}
      onClick={handleRowClick}
    >
      {isRowSelectable && (
        <div
          className={classNames(
            "is-flex is-justify-content-center",
            styles["datatable__selectBox"]
          )}
        >
          <Checkbox {...checkBoxProperties} />
        </div>
      )}
      {rowData
        .filter((data) => !data?.id)
        .map((data) => (
          <td className="is-size-6" style={{ padding: "16px" }}>
            <DataRenderer data={data} />
          </td>
        ))}
    </tr>
  )
}

export default DatatableRow
