import { navigate } from "gatsby"

export const getTableOptions = ({ callback }) => {
  return {
    customToolbarSelect: () => {},
    onRowClick: (data) => {
      let venue = data?.[5]?.data
      let vaccineeType = data?.[4]?.data
      let doseType = data?.[3]?.data
      let brand = data?.[2]?.data
      let date = data?.[1]?.data
      let id = data.find((column) => column.id).data

      callback({ venue, vaccineeType, doseType, brand, date, bookingId: id })

      navigate(`/bookings/details`, {
        state: data,
      })
    },
    filter: false,
    download: false,
    print: false,
    search: false,
    viewColumns: false,
  }
}
