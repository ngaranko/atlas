import React from 'react'
import PropTypes from 'prop-types'
import { ChevronRight } from '@datapunt/asc-assets'
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Heading,
  Icon,
  Link,
  Paragraph,
} from '@datapunt/asc-ui'

const NavigationLinkCard = ({
  loading,
  showError,
  CardIcon,
  title,
  description,
  href,
  ...otherProps
}) => (
  <Link href={href} linkType="blank" {...otherProps}>
    <Card horizontal loading={loading} animateLoading={!showError}>
      <CardMedia backgroundColor="level2">
        <CardIcon />
      </CardMedia>
      <CardContent>
        <Heading $as="h4">{title}</Heading>
        <Paragraph>{description}</Paragraph>
      </CardContent>
      <CardActions>
        <Icon size={15}>
          <ChevronRight />
        </Icon>
      </CardActions>
    </Card>
  </Link>
)

NavigationLinkCard.defaultProps = {
  loading: false,
  showError: false,
}

NavigationLinkCard.propTypes = {
  loading: PropTypes.bool,
  showError: PropTypes.bool,
  CardIcon: PropTypes.shape({}).isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
}

export default NavigationLinkCard
