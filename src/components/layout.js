import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import { Box, Text, Link as A } from "@chakra-ui/core"

import ThemeProvider from "src/context/theme"
import Header from "./header"
import "./layout.css"

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <>
      <Header siteTitle={data.site.siteMetadata.title} />
      <div
        style={{
          margin: `0 auto`,
        }}
      >
        <main>{children}</main>
        <Box
          as="footer"
          boxSizing="border-box"
          d="flex"
          h="10vh"
          bg="cadetblue"
          px="20px"
          py="10px"
          borderTop="2px solid"
          alignItems="center"
          textAlign="center"
        >
          <Text color="black">
            {`created with ❤ and `}
            <A color="purple.800" href="https://www.gatsbyjs.org">
              Gatsby
            </A>
          </Text>
        </Box>
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

const LayoutWithProvider = props => (
  <ThemeProvider>
    <Layout {...props} />
  </ThemeProvider>
)

export default LayoutWithProvider
