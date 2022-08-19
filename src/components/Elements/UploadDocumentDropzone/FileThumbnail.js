import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

import FileFigure from "./FileFigure"
import styles from "../utils/elements.module.scss"

import { isPdf } from "elements/UploadDocumentDropzone/services/dropzone"

const FileThumbnail = ({ file }) => {
  const data = useStaticQuery(graphql`
    {
      pdfThumbnail: file(relativePath: { eq: "pdf.png" }) {
        childImageSharp {
          fixed(width: 64) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  `)
  const pdfThumbnail = data.pdfThumbnail.childImageSharp.fixed

  return (
    <FileFigure isPdf={isPdf(file.path)} filename={file?.filename}>
      {isPdf(file.path) ? (
        <Img fixed={pdfThumbnail} alt="pdfThumbnail" />
      ) : (
        <img
          className={`image ${styles["column__figureMaxSize"]}`}
          src={file.path}
          alt="attachment"
        />
      )}
    </FileFigure>
  )
}

export default FileThumbnail
