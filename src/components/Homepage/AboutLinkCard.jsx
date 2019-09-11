import React from 'react'
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

export default AboutLinkCard
