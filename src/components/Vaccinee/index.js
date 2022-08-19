import React, { useState, useEffect } from "react"

import DashboardLayout from "layout/DashboardLayout"
import Datatable from "elements/Datatable"

import { vaccineeColumns } from "./utils/table"
import { getTableOptions } from "./services/getTableOptions"
import { getOrganizationVaccinees } from "./services/getOrganizationVaccinees"

const Vaccinee = ({ pageContext }) => {
  const [isTableDataLoading, setIsTableDataLoading] = useState(true)
  const [organizationVaccinees, setOrganizationVaccinees] = useState([])

  let { module } = pageContext

  const getInvitees = async () => {
    let fetchedOrganizationVaccinees = await getOrganizationVaccinees()
    setOrganizationVaccinees(fetchedOrganizationVaccinees)
    setIsTableDataLoading(false)
  }

  useEffect(() => {
    getInvitees()
  }, [])

  return (
    <DashboardLayout seoTitle={module?.seoTitle} title={module?.title}>
      <div>
        <Datatable
          columns={vaccineeColumns}
          data={organizationVaccinees}
          isLoading={isTableDataLoading}
          options={getTableOptions({ isLoading: false })}
        />
      </div>
    </DashboardLayout>
  )
}

export default Vaccinee
