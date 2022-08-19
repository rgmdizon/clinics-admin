import React, { Fragment, useState, useEffect } from "react"
import _ from "lodash"

import FormInput from "elements/Form/FormInput"
import FormSelect from "elements/Form/FormSelect"
import FormTextArea from "elements/Form/FormTextArea"
import address from "./utils/philippineLocations.json"
import AddressTypeChoices from "./utils/AddressTypeChoices.js"

const INPUT_STREET_PLACEHOLDER = "Unit/House No., Building, Street, Barangay"
const SELECT_PROVINCE_PLACEHOLDER = "Select province"
const SELECT_CITY_PLACEHOLDER = "Select city"
const SELECT_BARANGAY_PLACEHOLDER = "Select barangay"

const Address = ({
  isRequired,
  fieldNames = [],
  values = {},
  isNationwide,
  helper,
  setFieldValue,
  hideRequired,
  errors,
  options,
}) => {
  if (!!fieldNames && fieldNames?.length > 0) {
    fieldNames = fieldNames?.reduce((fieldNames, fieldName) => {
      let key = fieldName.split(".")
      key = key[key.length - 1]

      fieldNames[key] = fieldName
      return fieldNames
    }, {})
  }
  const {
    addressType,
    streetAddress,
    province,
    city,
    siteName,
    notes,
    barangay,
  } = fieldNames
  const [listOfProvince, setProvinces] = useState([])
  const [listOfCity, setListOfCity] = useState([])
  const [listOfBarangays, setListOfBarangays] = useState([])
  const shouldInputSite =
    !!siteName && _.get(values, addressType || "addressType") === "Office"

  useEffect(() => {
    initializeProvinces()
    const { Cities } = address.filter(
      (loc) => loc.Province === "Metro Manila"
    )[0]
    setListOfCity(sortCities(Cities))
    //eslint-disable-next-line
  }, [])

  const initializeProvinces = () => {
    let options = address.map(remapProvinces)
    const metroManila = options.filter(({ value }) => value === "Metro Manila")
    if (isNationwide) setProvinces(options)
    else setProvinces(metroManila)
  }

  const remapProvinces = ({ Province }) => ({
    value: Province,
    label: Province,
  })

  const sortCities = (cities) => {
    const sortedCities = cities
      .map(({ City, Barangays }) => ({
        value: City,
        label: City,
        barangays: Barangays,
      }))
      .sort((a, b) => {
        return a.value > b.value ? 1 : -1
      })

    return sortedCities
  }
  const handleOnChange = ({ value }, setFieldValue) => {
    const { Cities } = address.filter((loc) => loc.Province === value)[0]
    setListOfCity(sortCities(Cities))
    setFieldValue(city || "city", { value: "" })
  }

  const handleOnCityChange = ({ value }, setFieldValue) => {
    const selectedCity = listOfCity.find((item) => item.value === value)

    setListOfBarangays(
      selectedCity.barangays.map((item) => ({
        value: item,
        label: item,
      }))
    )
    setFieldValue(barangay || "barangay", { value: "" })
  }

  return (
    <Fragment>
      {addressType && (
        <AddressTypeChoices
          hideRequired={hideRequired}
          addressTypeName={addressType}
          values={values}
          setFieldValue={setFieldValue}
        />
      )}
      {shouldInputSite ? (
        <FormSelect
          name={siteName || "siteName"}
          label="Site Name"
          placeholder={SELECT_CITY_PLACEHOLDER}
          value={_.get(values, siteName || "siteName")}
          isRequired={isRequired}
          options={options
            .sort((a, b) => a.localeCompare(b))
            .map((option) => ({
              label: option,
              value: option,
            }))}
          errors={errors}
        />
      ) : (
        <Fragment>
          {streetAddress && (
            <FormInput
              name={streetAddress || "streetAddress"}
              label="Street Address"
              helper={helper}
              placeholder={INPUT_STREET_PLACEHOLDER}
              isRequired={isRequired}
              maxLength={150}
            />
          )}
          {province && (
            <FormSelect
              name={province || "province"}
              label="Province"
              isRequired={isRequired}
              value={_.get(values, province || "province")}
              placeholder={SELECT_PROVINCE_PLACEHOLDER}
              options={listOfProvince}
              onChange={handleOnChange}
              errors={errors}
            />
          )}
          {city && (
            <FormSelect
              name={city || "city"}
              label="City"
              placeholder={SELECT_CITY_PLACEHOLDER}
              value={_.get(values, city || "city")}
              isRequired={isRequired}
              options={listOfCity}
              onChange={handleOnCityChange}
              errors={errors}
            />
          )}
          {barangay && (
            <FormSelect
              name={barangay || "barangay"}
              label="Barangay"
              placeholder={SELECT_BARANGAY_PLACEHOLDER}
              value={_.get(values, barangay || "barangay")}
              isRequired={isRequired}
              options={listOfBarangays}
              hideOptional={!isRequired}
              isSelectable
            />
          )}
          {notes && (
            <FormTextArea
              label="Delivery Notes"
              placeholder="Green gate"
              name={notes || "notes"}
              maxLength={150}
            />
          )}
        </Fragment>
      )}
    </Fragment>
  )
}

export default Address
