import PropTypes from 'prop-types'
import React from 'react'
import styled from '@datapunt/asc-core'
import { connect } from 'react-redux'
import { Heading, themeSpacing } from '@datapunt/asc-ui'
import { getSearchQuery } from '../../../shared/ducks/data-search/selectors'

const TabBarWrapperStyle = styled.div`
  padding-top: ${themeSpacing(5)};
`

const StyledHeading = styled(Heading)`
  margin-bottom: ${themeSpacing(8)};
`

const TabBar = ({ numberOfResults, searchQuery, children }) => (
  <TabBarWrapperStyle>
    <StyledHeading>
      {!numberOfResults
        ? `Geen resultaten met '${searchQuery}'`
        : `Resultaten met '${searchQuery}'`}
    </StyledHeading>
    {children}
  </TabBarWrapperStyle>
)

TabBar.defaultProps = {
  children: null,
}

TabBar.propTypes = {
  searchQuery: PropTypes.string.isRequired,
  children: PropTypes.node,
  numberOfResults: PropTypes.number.isRequired,
}

const mapStateToProps = state => ({
  searchQuery: getSearchQuery(state),
})

export default connect(
  mapStateToProps,
  null,
)(TabBar)
