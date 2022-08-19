export const initialState = {
  selectedRows: [],
  loadedData: [],
  loadMore: false,
  hasRemainingData: false,
  mobileViewDataIncrement: 5,
  disabledSectionRows: [],
}

const DATATABLE = {
  SET_SELECTED_ROW: "SET_SELECTED_ROW",
  SET_DISABLED_ROWS: "SET_DISABLED_ROWS",
  RESET_APP: "RESET_APP",
}

const DATA = {
  SET_REMAINING_DATA: "SET_REMAINING_DATA",
  SET_LOADED_DATA: "SET_LOADED_DATA",
  SET_LOAD_DATA: "SET_LOAD_DATA",
}

export const datatableReducer = (state, action) => {
  switch (action.type) {
    case DATATABLE.SET_SELECTED_ROW:
      return {
        ...state,
        selectedRows: action?.payload,
      }
    case DATA.SET_REMAINING_DATA:
      return {
        ...state,
        hasRemainingData: action?.payload,
      }
    case DATA.SET_LOAD_DATA:
      return {
        ...state,
        loadMore: action?.payload,
      }
    case DATA.SET_LOADED_DATA:
      return {
        ...state,
        loadedData: action?.payload,
      }
    case DATATABLE.SET_DISABLED_ROWS:
      return {
        ...state,
        disabledSectionRows: [...state?.disabledSectionRows, action?.payload],
      }
    case DATATABLE.RESET_APP:
    default:
      return {
        ...initialState,
      }
  }
}
