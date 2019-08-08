import React from 'react'
import PropTypes from 'prop-types'
import styled from '@datapunt/asc-core'
import { connect } from 'react-redux'
import { authenticateRequest } from '../../../../shared/ducks/user/user'

const StyledLink = styled.a`
  cursor: pointer;

  .notification & {
    text-decoration: none;
  }
`

const LoginLink = ({ login }) => <StyledLink onClick={login}>&#62; Inloggen</StyledLink>

LoginLink.propTypes = {
  login: PropTypes.func.isRequired,
}

const mapDispatchToProps = dispatch => ({
  login: e => {
    e.preventDefault()
    dispatch(authenticateRequest('inloggen'))
    window.auth.login()
  },
})

export default connect(
  null,
  mapDispatchToProps,
)(LoginLink)
