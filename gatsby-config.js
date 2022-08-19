require("dotenv").config()

module.exports = {
  siteMetadata: {
    title: `MedGrocer`,
    description: `MedGrocer's online pharmacy, clinic management services, and
    patient support programs enable patients and companies to get
    their medicines conveniently, cost-effectively, and intelligently.`,
    author: `MedGrocer <it@medgrocer.com>`,
    siteUrl: `https://medgrocer.com`,
  },
  plugins: [
    `gatsby-transformer-remark`,
    `gatsby-plugin-sitemap`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sass`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        // replace "UA-XXXXXXXXX-X" with your own Tracking ID
        trackingId: process.env.GATSBY_GOOGLE_ANALYTICS_TRACKING_ID,
        head: true,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/static/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: `${__dirname}/src/pages/`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#eeeeee`,
        theme_color: `#0d6d6e`,
        display: `minimal-ui`,
        icon: `static/images/logos/medgrocer-square.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: "gatsby-plugin-root-import",
      options: {
        components: `${__dirname}/src/components`,
        elements: `${__dirname}/src/components/Elements`,
        layout: `${__dirname}/src/components/Layout`,
        pages: `${__dirname}/src/pages`,
        services: `${__dirname}/src/services`,
        static: `${__dirname}/src/static`,
        context: `${__dirname}/src/context`,
        auth: `${__dirname}/src/components/Auth`,
        organization: `${__dirname}/src/components/Organization`,
      },
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        defaultLayouts: {
          default: require.resolve(
            `${__dirname}/src/components/Layout/index.js`
          ),
        },
      },
    },
    `gatsby-env-variables`,
    {
      resolve: `gatsby-source-airtable`,
      options: {
        apiKey: process.env.GATSBY_AIRTABLE_API_KEY,
        concurrency: 5, // default, see using markdown and attachments for more information
        tables: [
          {
            baseId: process.env.GATSBY_AIRTABLE_VACCINES_FORM_FIELDS,
            tableName: `Form Fields`,
            tableView: `All Form Fields`,
            queryName: `allFormFields`,
            mapping: { Icons: `fileNode` },
            separateNodeType: true,
          },
          {
            baseId: process.env.GATSBY_AIRTABLE_VACCINES_FORM_FIELDS,
            tableName: `Permissions`,
            tableView: `All Permissions`,
            queryName: `allPermissions`,
            separateNodeType: true,
          },
          {
            baseId: process.env.GATSBY_AIRTABLE_VACCINES_FORM_FIELDS,
            tableName: `Vaccine Products`,
            tableView: `All Vaccine Products`,
            queryName: `allVaccineProduct`,
            separateNodeType: true,
          },
          {
            baseId: "appyA6jQ7QpWp9Fzr", //process.env.GATSBY_AIRTABLE_VACCINES_FORM_FIELDS,
            tableName: `VaxCert`,
            tableView: `All VaxCert Steps`,
            queryName: `allVaxCert`,
            mapping: { Screenshot: `fileNode` },
            separateNodeType: true,
          },
          {
            baseId: process.env.GATSBY_AIRTABLE_SCHEDULES_BASE_ID,
            tableName: `Vaccines`,
            tableView: `All Vaccines`,
            queryName: `allVaccines`,
            separateNodeType: true,
          },
        ],
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
