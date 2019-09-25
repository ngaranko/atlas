import React from 'react'
import { MenuInline, MenuToggle, MenuFlyOut, MenuItem, MenuButton } from '@datapunt/asc-ui'
import { ChevronRight } from '@datapunt/asc-assets'
import PropTypes from 'prop-types'
import RouterLink from 'redux-first-router-link'
import {
  toApisPage,
  toDatasets,
  toHelpPage,
  toMap,
  toPanoramaAndPreserveQuery,
  toAdresses,
} from '../../../store/redux-first-router/actions'
import truncateString from '../../../shared/services/truncateString/truncateString'

const toPanoramaAction = toPanoramaAndPreserveQuery(undefined, undefined, undefined, 'home')
const toMapAction = toMap()
const toDatasetsAction = toDatasets()
const toTablesAction = toAdresses() //
const toApisAction = toApisPage()
const toHelpAction = toHelpPage()

const components = {
  default: MenuInline,
  mobile: MenuToggle,
}

const Link = ({ children, ...otherProps }) => (
  <MenuButton $as={RouterLink} {...otherProps}>
    {children}
  </MenuButton>
)

const HeaderMenu = ({ type, login, logout, user, showFeedbackForm, ...props }) => {
  const Menu = components[type]

  return (
    <Menu {...props}>
      <MenuFlyOut label="Onderdelen">
        <MenuItem>
          <Link iconLeft={<ChevronRight />} to={toMapAction}>
            Kaart
          </Link>
        </MenuItem>
        <MenuItem>
          <Link iconLeft={<ChevronRight />} to={toPanoramaAction}>
            Panoramabeelden
          </Link>
        </MenuItem>
        <MenuItem>
          <Link iconLeft={<ChevronRight />} to={toDatasetsAction}>
            Datasets
          </Link>
        </MenuItem>
        <MenuItem>
          <Link iconLeft={<ChevronRight />} to={toTablesAction}>
            Tabellen
          </Link>
        </MenuItem>
        <MenuItem>
          <Link iconLeft={<ChevronRight />} to={toApisAction}>
            Data services
          </Link>
        </MenuItem>
      </MenuFlyOut>
      <MenuFlyOut label="Over OIS">
        <MenuItem>
          <Link iconLeft={<ChevronRight />} href="/">
            Onderzoek, Informatie en Statistiek
          </Link>
        </MenuItem>
        <MenuItem>
          <Link iconLeft={<ChevronRight />} href="/">
            Onderzoek
          </Link>
        </MenuItem>
        <MenuItem>
          <Link iconLeft={<ChevronRight />} href="/">
            Databeleid
          </Link>
        </MenuItem>
        <MenuItem>
          <Link iconLeft={<ChevronRight />} href="/">
            Bronnen
          </Link>
        </MenuItem>
        <MenuItem>
          <MenuButton iconLeft={<ChevronRight />} href="mailto:datapunt@amsterdam.nl">
            Contact
          </MenuButton>
        </MenuItem>
      </MenuFlyOut>
      <MenuItem>
        <MenuButton type="button" onClick={showFeedbackForm}>
          Feedback
        </MenuButton>
      </MenuItem>
      <MenuItem>
        <Link to={toHelpAction}>Help</Link>
      </MenuItem>

      {!user.authenticated ? (
        <MenuItem>
          <MenuButton type="button" onClick={login}>
            Inloggen
          </MenuButton>
        </MenuItem>
      ) : (
        <MenuFlyOut data-test="login" label={truncateString(user.name, 9)}>
          <MenuItem>
            <MenuButton type="button" onClick={logout} iconLeft={<ChevronRight />}>
              Uitloggen
            </MenuButton>
          </MenuItem>
        </MenuFlyOut>
      )}
    </Menu>
  )
}

HeaderMenu.propTypes = {
  login: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  showFeedbackForm: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  user: PropTypes.shape({}).isRequired,
}

export default HeaderMenu
