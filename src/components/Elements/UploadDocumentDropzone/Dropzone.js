import React, { useState, useRef, Fragment } from "react"
import Img from "gatsby-image"
import classNames from "classnames"
import { graphql, useStaticQuery } from "gatsby"

import Message from "elements/Message"

import { handleFileRead } from "./services/dropzone"
import styles from "../utils/elements.module.scss"

const MAX_FILE_SIZE_IN_BYTES = 3145728
const MAX_FILE_COUNT = 1

const Dropzone = ({
  label,
  icon,
  docType,
  maxFileCount = MAX_FILE_COUNT,
  maxFileSize = MAX_FILE_SIZE_IN_BYTES,
  currentFilesList = [],
  onUploadSuccess = null,
}) => {
  const data = useStaticQuery(graphql`
    {
      id: file(relativePath: { eq: "icons/upload__id.png" }) {
        childImageSharp {
          fixed(width: 150) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      document: file(relativePath: { eq: "icons/upload__document.png" }) {
        childImageSharp {
          fixed(width: 150) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      prescription: file(
        relativePath: { eq: "icons/upload__prescription.png" }
      ) {
        childImageSharp {
          fixed(width: 150) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  `)
  const [messages, setMessages] = useState([])
  const fileInputRef = useRef(null)
  const handleFileChooser = () => {
    fileInputRef.current.click()
  }

  return (
    <Fragment>
      <div
        className={classNames("mb-1", styles["dropzone"])}
        onClick={handleFileChooser}
        onKeyDown={(event) => {
          if (event.key === "Enter") handleFileChooser()
        }}
        role="button"
        tabIndex={0}
      >
        <input
          type="file"
          className={styles["dropzone__input"]}
          ref={fileInputRef}
          onChange={(event) =>
            handleFileRead({
              event,
              maxFileCount,
              maxFileSize,
              currentFilesList,
              docType,
              onUploadSuccess,
              setMessages,
            })
          }
          multiple
          accept="image/*,.pdf"
          value=""
        />
        <div
          className={classNames(
            "has-background-light mb-0 is-flex is-align-items-center is-justify-content-center",
            styles["dropzone__top"]
          )}
        >
          <Img fixed={data[icon || "prescription"].childImageSharp.fixed} />
        </div>
        <div
          className={classNames(
            "has-background-primary mt-0 mb-0 is-flex is-align-items-center is-justify-content-center",
            styles["dropzone__bottom"]
          )}
        >
          <p className="has-text-white is-size-6 has-text-centered has-text-weight-bold">
            {label || "Upload Document"}
          </p>
        </div>
      </div>
      {messages?.length > 0 && (
        <Message color="warning">
          <p className="is-size-6 has-text-black">
            <ul>
              {messages.map((message, index) => (
                <li key={index}>{message}</li>
              ))}
            </ul>
          </p>
        </Message>
      )}
    </Fragment>
  )
}

export default Dropzone
