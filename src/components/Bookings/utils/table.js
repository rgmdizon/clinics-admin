export const columns = [
  {
    name: "Booking ID",
    options: {
      display: false,
      filter: true,
      setCellHeaderProps: (value) => ({
        style: { fontWeight: "bold" },
      }),
    },
  },
  {
    name: "Vaccination Date",
    options: {
      filter: true,
      setCellHeaderProps: (value) => ({
        style: { fontWeight: "bold", textAlign: "left" },
      }),
    },
  },
  {
    name: "Brand",
    options: {
      filter: true,
      setCellHeaderProps: (value) => ({
        style: { fontWeight: "bold" },
      }),
    },
  },
  {
    name: "Jab Category",
    options: {
      filter: true,
      setCellHeaderProps: (value) => ({
        style: { fontWeight: "bold" },
      }),
    },
  },
  {
    name: "Age Category",
    options: {
      filter: true,
      setCellHeaderProps: (value) => ({
        style: { fontWeight: "bold" },
      }),
    },
  },

  {
    name: "Location",
    options: {
      filter: true,
      setCellHeaderProps: (value) => ({
        style: { fontWeight: "bold" },
      }),
    },
  },
  {
    name: "Slots",
    options: {
      filter: true,
      setCellHeaderProps: (value) => ({
        style: { fontWeight: "bold" },
      }),
    },
  },
  {
    name: "Vaccinee Status",
    options: {
      filter: true,
      setCellHeaderProps: (value) => ({
        style: { fontWeight: "bold" },
      }),
    },
  },
]

export const detailColumns = [
  "Email",
  {
    name: "Vaccinee Status",
    options: {
      filter: true,
    },
  },
  {
    name: "Vaccinee ID",
    options: {
      display: false,
      filter: true,
      setCellHeaderProps: (value) => ({
        style: { fontWeight: "bold" },
      }),
    },
  },
  "First Name",
  "Last Name",
  {
    name: "Actions",
    options: {
      sort: false,
    },
  },
]
