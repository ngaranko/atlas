import React from 'react'
import { MenuInline, MenuToggle, MenuFlyOut, MenuItem, MenuButton } from '@datapunt/asc-ui'
import { ChevronRight } from '@datapunt/asc-assets'
import PropTypes from 'prop-types'
import RouterLink from 'redux-first-router-link'
import { toArticleDetail } from '../../../store/redux-first-router/actions'
import truncateString from '../../../shared/services/truncateString/truncateString'
import NAVIGATION_LINKS from '../HomePage/services/navigation-links'

import { HEADER_LINKS } from '../../../shared/config/config'

const components = {
  default: MenuInline,
  mobile: MenuToggle,
}

const HeaderMenu = ({ type, login, logout, user, showFeedbackForm, ...props }) => {
  const Menu = components[type]
  return (
    <Menu {...props}>
      <MenuFlyOut label="Onderdelen">
        {NAVIGATION_LINKS.map(({ id, title, to }) => (
          <MenuButton $as={RouterLink} iconLeft={<ChevronRight />} key={id} title={title} to={to}>
            {title}
          </MenuButton>
        ))}
      </MenuFlyOut>
      <MenuFlyOut label="Over OIS">
        {HEADER_LINKS &&
          HEADER_LINKS.ABOUT.map(({ title, id, slug }) => {
            const linkId = id[process.env.NODE_ENV]

            return (
              <MenuItem key={linkId}>
                <MenuButton
                  $as={RouterLink}
                  iconLeft={<ChevronRight />}
                  title={title}
                  to={toArticleDetail(linkId, slug)}
                >
                  {title}
                </MenuButton>
              </MenuItem>
            )
          })}
      </MenuFlyOut>
      <MenuItem>
        <MenuButton type="button" onClick={showFeedbackForm}>
          Feedback
        </MenuButton>
      </MenuItem>
      {HEADER_LINKS && (
        <MenuItem>
          <MenuButton
            $as={RouterLink}
            title={HEADER_LINKS.HELP.title}
            to={toArticleDetail(HEADER_LINKS.HELP.id[process.env.NODE_ENV], HEADER_LINKS.HELP.slug)}
          >
            {HEADER_LINKS.HELP.title}
          </MenuButton>
        </MenuItem>
      )}
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
