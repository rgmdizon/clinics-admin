import React, { useContext, Fragment } from "react"
import _ from "lodash"

import Dropzone from "./Dropzone"
import DocumentsCardRow from "./DocumentsCardRow"

import { AppContext } from "context/AppContext"

const UploadDocumentDropzone = (props) => {
  const { state, dispatch } = useContext(AppContext)

  const file = state?.documents?.find((document) =>
    document?.name?.startsWith(props.docType.toLowerCase())
  )
  const files = state?.documents?.filter((document) =>
    document?.name?.startsWith(props.docType.toLowerCase())
  )

  const handleUploadSuccess = ({ file }) => {
    dispatch({
      type: "SAVE_DOCUMENT",
      payload: file,
    })

    props.setFieldValue(props.name, file)
  }

  const handleDeleteDocument = (index, fileName) => {
    let tempDocuments = [...state?.documents]
    tempDocuments = tempDocuments.filter(
      (document) => document.name !== fileName
    )
    dispatch({
      type: "SAVE_DOCUMENTS",
      payload: [...tempDocuments],
    })

    props.setFieldValue(props.name, {})
  }

  let errorMessage =
    props.submitCount > 0 ? _.get(props?.errors, props?.name) : ""

  return (
    <Fragment>
      {files && (
        <div className="mb-1">
          {files?.map(
            (document, index) =>
              file && (
                <DocumentsCardRow
                  index={index}
                  fileName={document.name}
                  oldFileName={document.oldname}
                  handleDeleteDocument={handleDeleteDocument}
                  file={document}
                />
              )
          )}
        </div>
      )}
      {files?.length < props.maxFiles && (
        <Dropzone
          currentFilesList={state?.documents}
          docType={props.docType || "RX"}
          icon={props.icon}
          label={props.label}
          onUploadSuccess={handleUploadSuccess}
          maxFileCount={16}
        />
      )}
      <input
        className="is-hidden"
        value={props.value}
        name={props.name}
        onChange={(event) =>
          props.setFieldValue(props.name, event.currentTarget.files[0])
        }
      />
      <p className="help is-danger">
        {!!props.errors
          ? !!errorMessage?.name
            ? errorMessage?.name
            : errorMessage
          : null}
      </p>
    </Fragment>
  )
}

export default UploadDocumentDropzone
