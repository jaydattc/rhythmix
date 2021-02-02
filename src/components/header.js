import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

const Header = ({ siteTitle }) => (
  <header
    style={{
      background: `cadetblue`,
      borderBottom: "2px solid",
      boxSizing: "border-box",
    }}
  >
    <div
      style={{
        margin: `0 auto`,
        padding: `1.45rem 1.0875rem`,
        height: `10vh`,
      }}
    >
      <h1 style={{ margin: 0 }}>
        <Link
          to="/"
          style={{
            fontSize: "1.2rem",
            color: `black`,
            textDecoration: `none`,
          }}
        >
          {siteTitle}
        </Link>
      </h1>
    </div>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
