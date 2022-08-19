export const parseFirebaseDocument = ({ document, exclusions = [] }) => {
  let parsedDocument = {}
  let documentKeys = Object.keys(document).filter(
    (key) => !exclusions.includes(key)
  )

  documentKeys.forEach((key) => {
    let value = document[key]
    let type = typeof value

    switch (type) {
      case "object":
        let valueKeys = Object.keys(value)

        // Check if object is date or address and defaults to select if both conditions are not met
        if (typeof value?.length !== "undefined") {
          parsedDocument[key] = {
            arrayValue: {
              values: value
                ?.filter((data) => !data?.includes("Other"))
                ?.map((data) => ({ stringValue: data })),
            },
          }
        } else if (
          valueKeys.includes("year") ||
          valueKeys.includes("date") ||
          valueKeys.includes("month")
        ) {
          parsedDocument[key] = {
            mapValue: {
              fields: {
                month: {
                  stringValue: value?.month?.value || value?.month,
                },
                date: {
                  integerValue: value?.date?.value || value?.date,
                },
                year: {
                  integerValue: value?.year?.value || value?.year,
                },
              },
            },
          }
        } else if (
          valueKeys.includes("streetAddress") ||
          valueKeys.includes("province") ||
          valueKeys.includes("city") ||
          valueKeys.includes("barangay")
        ) {
          parsedDocument[key] = {
            mapValue: {
              fields: {
                streetAddress: {
                  stringValue: value?.streetAddress,
                },
                province: {
                  stringValue: value?.province?.value || value?.province,
                },
                barangay: {
                  stringValue: value?.barangay?.value || value?.barangay,
                },
                city: {
                  stringValue: value?.city?.value || value?.address?.city,
                },
              },
            },
          }
        } else {
          parsedDocument[key] = {
            stringValue: value?.value || value,
          }
        }
        break
      case "text":
      case "array":
      default:
        parsedDocument[key] = { stringValue: value }
        break
    }
  })

  return parsedDocument
}
