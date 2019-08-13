import React from 'react'
import PropTypes from 'prop-types'
import styled from '@datapunt/asc-core'
import { Link, styles, svgFill, color, Typography } from '@datapunt/asc-ui'
import { connect } from 'react-redux'
import { authenticateRequest } from '../../../../shared/ducks/user/user'

const StyledLink = styled(Link)`
  color: ${color('tint', 'level1')};

  ${styles.IconStyle} {
    ${svgFill('tint', 'level1')};
  }

  &:hover {
    cursor: pointer;
    color: ${color('tint', 'level1')};
    text-decoration: underline;

    ${styles.IconStyle} {
      ${svgFill('tint', 'level1')};
    }
  }
`

export const LoginLink = ({ login, linkType, children, inverted }) => (
  <Typography $as="p" className="c-panel__paragraph">
    {inverted ? (
      <StyledLink onClick={login} linkType={linkType}>
        {children || 'Inloggen'}
      </StyledLink>
    ) : (
      <Link as="button" onClick={login} linkType={linkType}>
        {children || 'Inloggen'}
      </Link>
    )}
  </Typography>
)

LoginLink.defaultProps = {
  linkType: 'with-chevron',
  inverted: true,
}

LoginLink.propTypes = {
  login: PropTypes.func.isRequired,
  linkType: PropTypes.string,
  inverted: PropTypes.bool,
}

export const mapDispatchToProps = dispatch => ({
  login: e => {
    e.preventDefault()
    dispatch(authenticateRequest('inloggen'))
    window.auth.login()
  },
})

const LoginLinkContainer = connect(
  null,
  mapDispatchToProps,
)(LoginLink)

export default LoginLinkContainer
