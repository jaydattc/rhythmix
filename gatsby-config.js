const path = require("path")
module.exports = {
  pathPrefix: "rhythmix/",
  siteMetadata: {
    title: `Rhythmix`,
    description: `Rhythmix: A polyrhythm trainer and tester for musicians.`,
    author: `@cjaydatt`,
    siteUrl: "https://jaydattc.github.io/rhythmix/",
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: "gatsby-plugin-root-import",
      options: {
        "@": __dirname,
        src: path.join(__dirname, "src"),
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `rhythmix`,
        short_name: `rhythmix`,
        start_url: `rhythmix/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    `gatsby-plugin-offline`,
  ],
}
