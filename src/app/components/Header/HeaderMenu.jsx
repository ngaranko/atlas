import React from 'react'
import { MenuInline, MenuToggle, MenuFlyOut, MenuItem, MenuButton } from '@datapunt/asc-ui'
import { ChevronRight } from '@datapunt/asc-assets'
import PropTypes from 'prop-types'
import RouterLink from 'redux-first-router-link'
import { toHelpPage, toArticleDetail } from '../../../store/redux-first-router/actions'
import truncateString from '../../../shared/services/truncateString/truncateString'
import { colofonLinks } from '../Footer/services/footer-links'
import navigationLinks from '../Homepage/services/navigation-links'

const components = {
  default: MenuInline,
  mobile: MenuToggle,
}

const Link = ({ children, ...otherProps }) => (
  <MenuButton $as={RouterLink} {...otherProps}>
    {children}
  </MenuButton>
)

const NavigationLink = ({ title, toAction, ...otherProps }) => (
  <Link iconLeft={<ChevronRight />} to={toAction} {...otherProps}>
    {title}
  </Link>
)

const HeaderMenu = ({ type, login, logout, user, showFeedbackForm, ...props }) => {
  const Menu = components[type]

  return (
    <Menu {...props}>
      <MenuFlyOut label="Onderdelen">
        {navigationLinks.map(({ title, toAction }) => (
          <NavigationLink key={title} title={title} to={toAction} />
        ))}
      </MenuFlyOut>
      <MenuFlyOut label="Over OIS">
        {colofonLinks.map(({ menuTitle, id, slug }) => (
          <MenuItem key={slug}>
            <Link iconLeft={<ChevronRight />} title={menuTitle} to={toArticleDetail(id, slug)}>
              {menuTitle}
            </Link>
          </MenuItem>
        ))}
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
        <Link to={toHelpPage()}>Help</Link>
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
