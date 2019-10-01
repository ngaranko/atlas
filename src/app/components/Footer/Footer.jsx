import React from 'react'
import RouterLink from 'redux-first-router-link'
import styled from '@datapunt/asc-core'
import {
  Link,
  Footer as FooterComponent,
  FooterBottom,
  FooterBottomLinkList,
  FooterContent,
  FooterHeading,
  FooterBottomLinkListItem,
  FooterToggle,
  FooterTop,
  Row,
  Column,
  CompactThemeProvider,
} from '@datapunt/asc-ui'
import { routing } from '../../routes'
import SocialLinks from './SocialLinks'
import HelpLinks from './HelpLinks'
import ColofonLinks from './ColofonLinks'

import { FOOTER_LINKS } from '../../../shared/config/config'

const RouterLinkWrapper = ({ to, className, children }) => (
  <RouterLink to={to} className={className}>
    {children}
  </RouterLink>
)

const StyledLink = ({ children, ...otherProps }) => (
  <Link $as={RouterLinkWrapper} linkType="with-chevron" gutterBottom={3} {...otherProps}>
    {children}
  </Link>
)

const colofonLinks = FOOTER_LINKS && FOOTER_LINKS.COLOFON
const socialLinks = FOOTER_LINKS && FOOTER_LINKS.SOCIAL
const helpLinks = FOOTER_LINKS && FOOTER_LINKS.HELP

const Footer = () => (
  <CompactThemeProvider>
    <FooterComponent>
      <FooterTop>
        <Row>
          <Column wrap span={{ small: 1, medium: 2, big: 2, large: 4, xLarge: 4 }}>
            <FooterToggle title="Colofon" hideAt="tabletM">
              <FooterContent indent>
                {colofonLinks && <ColofonLinks links={colofonLinks} />}
              </FooterContent>
            </FooterToggle>
            <FooterContent showAt="tabletM">
              <FooterHeading $as="h3">Colofon</FooterHeading>
              {colofonLinks && <ColofonLinks links={colofonLinks} />}
            </FooterContent>
          </Column>
          <Column wrap span={{ small: 1, medium: 2, big: 2, large: 4, xLarge: 4 }}>
            <FooterToggle title="Volg de gemeente" hideAt="tabletM">
              <FooterContent indent>
                {socialLinks && <SocialLinks links={socialLinks} />}
              </FooterContent>
            </FooterToggle>
            <FooterContent showAt="tabletM">
              <FooterHeading $as="h3">Volg de gemeente</FooterHeading>
              {socialLinks && <SocialLinks links={socialLinks} />}
            </FooterContent>
          </Column>
          <Column wrap span={{ small: 1, medium: 2, big: 2, large: 4, xLarge: 4 }}>
            <FooterToggle title="Vragen?" hideAt="tabletM">
              <FooterContent indent>{helpLinks && <HelpLinks links={helpLinks} />}</FooterContent>
            </FooterToggle>
            <FooterContent showAt="tabletM">
              <FooterHeading $as="h3" styleAs="h3">
                Vragen?
              </FooterHeading>
              {helpLinks && <HelpLinks links={helpLinks} />}
            </FooterContent>
          </Column>
        </Row>
      </FooterTop>
      <FooterBottom>
        <Row>
          <Column wrap span={{ small: 1, medium: 2, big: 6, large: 10, xLarge: 10 }}>
            <FooterBottomLinkList>
              <FooterBottomLinkListItem>
                <StyledLink to={{ type: routing.proclaimer.type }}>Privacy en cookies</StyledLink>
              </FooterBottomLinkListItem>
            </FooterBottomLinkList>
          </Column>
        </Row>
      </FooterBottom>
    </FooterComponent>
  </CompactThemeProvider>
)

export default Footer
