import React, { useContext } from "react"
import Img from "gatsby-image"
import classNames from "classnames"
import { useStaticQuery, graphql } from "gatsby"

import FilePreview from "./FilePreview"

import { AppContext } from "context/AppContext"
import styles from "../utils/elements.module.scss"

const DocumentsCardRow = ({
  fileName,
  oldFileName,
  handleDeleteDocument,
  index,
  file,
}) => {
  const data = useStaticQuery(graphql`
    {
      pdfThumbnail: file(relativePath: { eq: "pdf.png" }) {
        childImageSharp {
          fixed(width: 48) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  `)
  const pdfThumbnail = data.pdfThumbnail.childImageSharp.fixed

  const { dispatch } = useContext(AppContext)
  let oldFileNameArray = oldFileName.split(".")
  let fileType = oldFileNameArray[oldFileNameArray.length - 1] || "file"

  const imageThumbnail =
    fileType === "pdf" ? (
      <Img fixed={pdfThumbnail} />
    ) : (
      <img
        src={file.path}
        className={classNames(
          "image is-28x28",
          styles["documentRow__imgThumbnail"]
        )}
        alt="attachment"
      />
    )

  const handleFileClick = () =>
    dispatch({
      type: "SHOW_MODAL",
      payload: {
        content: <FilePreview file={file} isPdf={fileType === "pdf"} />,
      },
    })

  return (
    <div
      className={classNames("media")}
      onClick={handleFileClick}
      onKeyDown={(event) => {
        if (event.key === "Enter") handleFileClick()
      }}
      tabIndex={0}
      role="button"
    >
      <figure className={classNames("media-left")}>{imageThumbnail}</figure>
      <div className="media-content is-size-7">
        <div className="subtitle">
          {fileName}
          <p className="help">{oldFileName}</p>
        </div>
      </div>
      <div className="media-right">
        <span
          className="delete"
          onKeyDown={(event) => {
            if (event.key === "Enter") handleDeleteDocument(index, fileName)
          }}
          onClick={(event) => {
            event.stopPropagation()
            handleDeleteDocument(index, fileName)
          }}
          tabIndex={0}
          role="button"
          type="button"
        >
          {" "}
        </span>
      </div>
    </div>
  )
}

export default DocumentsCardRow
