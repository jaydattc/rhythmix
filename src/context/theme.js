import React from "react"
import { theme, CSSReset, ThemeProvider } from "@chakra-ui/core"

const CustomThemeProvider = props => (
  <ThemeProvider theme={theme}>
    <CSSReset />
    {props.children}
  </ThemeProvider>
)

export default CustomThemeProvider
