import React from 'react'
import PropTypes from 'prop-types'
import {
  Card,
  CardContent,
  CardMedia,
  Heading,
  Paragraph,
  Image,
  Tag,
  Link,
} from '@datapunt/asc-ui'

const SpecialsLinkCard = ({
  loading,
  showError,
  title,
  tag,
  href,
  description,
  imageSrc,
  imageAlt,
  ...otherProps
}) => (
  <Link href={href} linkType="blank" {...otherProps}>
    <Card horizontal animateLoading={!showError} loading={loading}>
      <CardContent>
        <Heading $as="h4" styleAs="h3" gutterBottom={8}>
          {title}
        </Heading>
        <Paragraph>
          <Tag>{tag}</Tag>
          {description}
        </Paragraph>
      </CardContent>
      <CardMedia>
        <Image src={imageSrc} alt={imageAlt} square />
      </CardMedia>
    </Card>
  </Link>
)

SpecialsLinkCard.defaultProps = {
  loading: false,
  showError: false,
}

SpecialsLinkCard.propTypes = {
  loading: PropTypes.bool,
  showError: PropTypes.bool,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
}

export default SpecialsLinkCard
