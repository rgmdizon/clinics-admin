import classNames from "classnames"
import React, { Fragment } from "react"
import { Field, FieldArray, ErrorMessage } from "formik"

import styles from "../utils/elements.module.scss"

const FormStyledRadio = ({
  icon,
  name,
  label,
  icons,
  values,
  helper,
  onClick,
  options,
  children,
  isRequired,
  hideOptional,
  setFieldValue,
  disabledOptions,
}) => {
  const handleSelectInput = (option) => {
    if (!disabledOptions?.includes(option)) {
      setFieldValue(name, option)
      if (onClick) onClick(option)
    }
  }

  return (
    <Fragment>
      <label
        className={classNames("label has-text-weight-normal has-text-left")}
      >
        {label}
        {isRequired && hideOptional && (
          <span className="has-text-grey is-italic"> (Optional)</span>
        )}
        {!!helper && (
          <span
            className={classNames("help has-text-weight-normal has-text-left")}
          >
            {helper}
          </span>
        )}
      </label>
      <FieldArray name={name}>
        {() => (
          <div className={classNames(styles["styledRadioFlex"])}>
            {options?.map((option, index) => (
              <div
                className={classNames(styles["styledRadioFlex__radio"])}
                key={index}
              >
                <Field>
                  {() => (
                    <div className={classNames("field")}>
                      <div
                        className={classNames(
                          styles[
                            `styledRadio__option${
                              values?.[name] === option ? "Active" : ""
                            }`
                          ],
                          styles[
                            disabledOptions?.includes(option)
                              ? "styledRadio__disabled"
                              : ""
                          ]
                        )}
                        onClick={() => {
                          handleSelectInput(option)
                        }}
                        onKeyDown={() => {
                          handleSelectInput(option)
                        }}
                        role="button"
                        tabIndex="0"
                      >
                        <div className="columns is-vcentered is-mobile ml-1 ml-0-mobile">
                          <div
                            className={classNames(
                              styles["styledRadio__radioButton"]
                            )}
                          >
                            {values?.[name] === option && (
                              <div
                                className={classNames(
                                  styles["styledRadio__radioButtonChecked"]
                                )}
                              ></div>
                            )}
                          </div>
                          <div className="column ml-1">
                            <div
                              className={classNames(
                                "is-flex pr-1 is-align-items-center is-flex-wrap mt-1-mobile",
                                styles["styledRadio__label"]
                              )}
                            >
                              {icons?.localFiles?.[index]?.childImageSharp
                                ?.fluid?.originalImg && (
                                <img
                                  width={50}
                                  alt="icon"
                                  src={
                                    icons?.localFiles?.[index]?.childImageSharp
                                      ?.fluid?.originalImg
                                  }
                                />
                              )}
                              <div className="column pl-1">
                                {option && (
                                  <p
                                    className={classNames(
                                      "is-size-5",
                                      styles[
                                        disabledOptions?.includes(option)
                                          ? "styledRadio__disabledOption"
                                          : ""
                                      ]
                                    )}
                                  >
                                    {option}
                                  </p>
                                )}
                                {children}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </Field>
              </div>
            ))}
          </div>
        )}
      </FieldArray>
      <p className="help is-danger mt-0 mb-1">
        <ErrorMessage name={name} />
      </p>
    </Fragment>
  )
}

export default FormStyledRadio
