import React from 'react'
import PropTypes from 'prop-types'
import { Card, Heading, Paragraph, Link, CardContent } from '@datapunt/asc-ui'

const AboutLinkCard = ({ loading, title, description, href }) => (
  <Link href={href} linkType="blank">
    <Card backgroundColor="level2" shadow loading={loading}>
      <CardContent>
        <Heading $as="h4" styleAs="h3">
          {title}
        </Heading>
        <Paragraph>{description}</Paragraph>
      </CardContent>
    </Card>
  </Link>
)

AboutLinkCard.defaultProps = {
  loading: false,
}

AboutLinkCard.propTypes = {
  loading: PropTypes.bool,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
}

export default AboutLinkCard
