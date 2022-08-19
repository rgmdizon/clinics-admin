import React, { Fragment } from "react"
import styles from "../utils/elements.module.scss"
import classNames from "classnames"

const FilePreview = ({ file, isPdf }) => (
  <Fragment>
    {isPdf ? (
      <object
        className={classNames(styles["documentCard__filePreview"])}
        data={file.path}
        type="application/pdf"
        aria-labelledby="pdfPreview"
      />
    ) : (
      <figure>
        <img src={file.path} alt="attachment" />
      </figure>
    )}
  </Fragment>
)

export default FilePreview
