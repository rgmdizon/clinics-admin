const getVaxCertPages = () => [
  {
    module: "vaxcert",
    path: `vaxcert`,
    componentPath: `./src/components/VaxCert/index.js`,
    context: {
      nextPath: `/vaxcert`,
      backPath: `/`,
      module: {
        name: "vaxcert",
        title: `Vax Cert`,
        seoTitle: "Vax Cert",
      },
    },
  },
]

module.exports = { getVaxCertPages }
