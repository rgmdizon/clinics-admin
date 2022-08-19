import React from "react"
import Card from "elements/Card"
import Section from "elements/Section"

import vaccines from "../utils/vaccinesList.json"
import { formatNumber } from "../../../services/formatting"

import { getSignedInUser } from "auth/services/user"
import { getRemainingAllocation } from "auth/services/allocations"

const Allocations = () => {
  const { organization } = getSignedInUser()

  const organizationAllocation = organization?.allocations

  let remainingAllocation = getRemainingAllocation()

  return (
    <Card>
      <Section title="Allocations">
        <div className="table-container">
          <table className="table is-fullwidth has-text-centered">
            <thead>
              <tr>
                <td className="has-text-weight-bold">Vaccine</td>
                <td className="has-text-weight-bold">
                  Available Allocation (Doses)
                </td>
              </tr>
            </thead>
            <tbody>
              {vaccines.map((vaccine) => {
                return (
                  <tr>
                    <td>{vaccine}</td>
                    <td>
                      {formatNumber({
                        number: remainingAllocation[vaccine.toLowerCase()] || 0,
                        decimalPlaces: 1,
                      })}{" "}
                      /{" "}
                      {formatNumber({
                        number:
                          organizationAllocation[vaccine.toLowerCase()] || 0,
                        decimalPlaces: 1,
                      })}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>{" "}
      </Section>
    </Card>
  )
}

export default Allocations
