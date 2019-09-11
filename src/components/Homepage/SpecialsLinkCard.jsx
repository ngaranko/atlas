import React from 'react'
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
}) => (
  <Link href={href} linkType="blank">
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

export default SpecialsLinkCard
