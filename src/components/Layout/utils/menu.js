import { faSuitcase, faCalendarAlt } from "@fortawesome/free-solid-svg-icons"

export const menu = [
  {
    section: "General",
    links: [
      {
        label: "Organization Profile",
        link: "/profile",
        icon: faSuitcase,
      },
      {
        label: "Bookings",
        link: "/bookings",
        icon: faCalendarAlt,
      },
      // {
      //   label: "Vaccinees",
      //   link: "/vaccinees",
      //   icon: faUser,
      // },
    ],
  },
]
