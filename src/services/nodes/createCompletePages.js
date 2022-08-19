const path = require("path")
const { getCompletePages } = require("./utils/getCompletePages")

const createCompletePages = (createPage) => {
  return new Promise((resolve, reject) => {
    try {
      let completePages = getCompletePages()
      completePages.map((completePage) => {
        createPage({
          path: completePage.path,
          component: path.resolve(completePage.componentPath),
          context: {
            ...completePage.context,
          },
        })
      })

      resolve()
    } catch (error) {
      reject(error)
      console.log(
        `%cError (createCompletePages): ${error}`,
        "background-color:#d84544; font-color:white;"
      )
    }
  })
}

module.exports = { createCompletePages }
