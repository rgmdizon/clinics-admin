import React, { useReducer, useEffect, useRef } from "react"
import MUIDataTable from "mui-datatables"
import classNames from "classnames"

import Loading from "elements/Loading"

import {
  createTheme,
  ThemeProvider,
  responsiveFontSizes,
} from "@mui/material/styles"
import { getTableOptions } from "./services/options"
import { datatableReducer, initialState } from "./context/reducer"

const Datatable = ({ data, columns, options, isLoading, MobileCard }) => {
  const [datatableState, datatableDispatch] = useReducer(
    datatableReducer,
    initialState
  )

  const LOAD_REF = useRef()
  const handleObserver = (entities) => {
    const TARGET = entities?.[0]
    if (TARGET.isIntersecting)
      datatableDispatch({ type: "SET_LOAD_DATA", payload: true })
  }

  // Initialize intersection observer API
  useEffect(() => {
    let options = {
      root: null,
      threshold: 1.0,
    }

    const OBSERVER = new IntersectionObserver(handleObserver, options)
    if (LOAD_REF.current) OBSERVER.observe(LOAD_REF.current)

    datatableDispatch({
      type: "SET_LOADED_DATA",
      payload: [...data.slice(0, datatableState?.mobileViewDataIncrement)],
    })

    //eslint-disable-next-line
  }, [])

  useEffect(() => {
    if (datatableState?.loadMore && datatableState?.hasRemainingData) {
      let currentLength = datatableState?.loadedData?.length
      let hasMore = currentLength < data?.length
      let nextResults = hasMore
        ? data?.slice(
            currentLength,
            currentLength + datatableState?.mobileViewDataIncrement
          )
        : []

      datatableDispatch({
        type: "SET_LOADED_DATA",
        payload: [...datatableState?.loadedData, ...nextResults],
      })
      datatableDispatch({ type: "SET_LOAD_DATA", payload: false })
    }

    //eslint-disable-next-line
  }, [datatableState?.loadMore, datatableState?.hasRemainingData])

  useEffect(() => {
    datatableDispatch({
      type: "SET_REMAINING_DATA",
      payload: datatableState?.loadedData?.length < data?.length,
    })

    //eslint-disable-next-line
  }, [datatableState?.loadedData])

  useEffect(() => {
    if (data?.length)
      datatableDispatch({
        type: "SET_LOADED_DATA",
        payload: [...data.slice(0, datatableState?.mobileViewDataIncrement)],
      })

    //eslint-disable-next-line
  }, [data])

  let datatableTheme = responsiveFontSizes(
    createTheme({
      overrides: {},
    })
  )

  let finalOptions = {
    ...getTableOptions({
      onRowClick: () => {},
      isLoading,
      ...options,
      state: datatableState,
      dispatch: datatableDispatch,
    }),
    ...options,
  }

  return (
    <section className="m-2-mobile m-2-tablet m-1-desktop">
      <div className={classNames({ "is-hidden-mobile": !!MobileCard })}>
        <ThemeProvider theme={datatableTheme}>
          <MUIDataTable data={data} columns={columns} options={finalOptions} />
        </ThemeProvider>
      </div>
      <div className={classNames({ "is-hidden-tablet": !!MobileCard })}>
        {MobileCard &&
          datatableState?.loadedData?.map((rowData) => (
            <MobileCard className="mb-2" rowData={rowData} />
          ))}
        <div className={classNames("is-hidden-tablet")} ref={LOAD_REF}>
          {datatableState?.hasRemainingData && MobileCard ? (
            <Loading size="5" isFullscreen={false} />
          ) : null}
        </div>
      </div>
    </section>
  )
}

export default Datatable
