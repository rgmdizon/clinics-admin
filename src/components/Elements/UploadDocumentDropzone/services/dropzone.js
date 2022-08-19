import Resizer from "react-image-file-resizer"
import moment from "moment"

const MINIMUM_SIZE_TO_COMPRESS = 1048576

const generateFileName = ({ format, docType }) => {
  let type = docType?.toLowerCase()
  const fileExtension = format.split("/")[1]

  return `${type}_${moment().format("YYYYMMDD_HHmmss")}${
    fileExtension === "pdf" ? `.${fileExtension}` : ""
  }`
}

export const resizeFile = (file) =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      1000,
      1000,
      "JPEG",
      100,
      0,
      (uri) => {
        resolve(uri)
      },
      "base64"
    )
  })

export const readFile = (file) =>
  new Promise((resolve) => {
    let reader = new FileReader()

    reader.readAsDataURL(file)
    reader.onload = () => {
      resolve(reader.result)
    }
  })

export const isPdf = (imgData) => {
  return (
    imgData.substring("data:".length, imgData.indexOf(";base64")) ===
    "application/pdf"
  )
}

export const uploadDocument = async ({ file, docType }) => {
  let newFile
  if (file.type === "application/pdf" || file.size < MINIMUM_SIZE_TO_COMPRESS)
    newFile = await readFile(file)
  else newFile = await resizeFile(file)

  return {
    path: newFile,
    name: generateFileName({ format: file.type, docType }),
    filename: generateFileName({ format: file.type, docType }),
    oldname: file.name,
    type: docType,
  }
}

export const isAlreadyUploaded = ({ file, filesUploaded }) => {
  return filesUploaded.some((uploaded) => file.path === uploaded.path)
}

export const handleFileRead = async ({
  event,
  maxFileCount,
  maxFileSize,
  currentFilesList,
  onUploadSuccess,
  docType,
  setMessages,
}) => {
  setMessages([])
  const tempFilesUploaded = [...event.target.files]
  const hasExceededMaxFiles =
    tempFilesUploaded.length + currentFilesList.length > maxFileCount
  const BYTES_IN_MEGABYTES = 1048576
  let messages = []
  if (!hasExceededMaxFiles) {
    for (let i = 0; i < tempFilesUploaded.length; i++) {
      if (tempFilesUploaded[i].size < maxFileSize) {
        let uploadedFile = await uploadDocument({
          file: tempFilesUploaded[i],
          docType,
          onUploadSuccess,
        })

        if (
          !isAlreadyUploaded({
            file: uploadedFile,
            filesUploaded: currentFilesList,
          }) &&
          onUploadSuccess
        )
          onUploadSuccess({ file: uploadedFile })
        else messages.push(`${uploadedFile.oldname} has already been uploaded.`)
      } else
        messages.push(
          `${tempFilesUploaded[i].name} is greater than ${parseInt(
            maxFileSize / BYTES_IN_MEGABYTES
          )}MB. Please upload a file or photo less than ${parseInt(
            maxFileSize / BYTES_IN_MEGABYTES
          )}MB.`
        )
    }
  } else
    messages.push(
      `Please upload only a maximum of ${maxFileCount} file${
        maxFileCount > 1 ? "s" : ""
      }.`
    )

  setMessages(messages)
}
