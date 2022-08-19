import { navigate } from "gatsby"

export const getTableOptions = () => {
  return {
    customToolbarSelect: () => {},
    onRowClick: (data) => {
      navigate(`/vaccinees/vaccinee?id=${data[0]}`, { state: data })
    },
  }
}
