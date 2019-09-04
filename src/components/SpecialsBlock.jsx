import React from 'react'
import styled from '@datapunt/asc-core'
import {
  Card,
  CardContent,
  CardMedia,
  CardContainer,
  Heading,
  Paragraph,
  Image,
  Row,
  Column,
  Tag as AscTag,
  Link,
  themeColor,
  breakpoint,
  styles,
} from '@datapunt/asc-ui'

const Tag = ({ children }) => (
  <AscTag colorType="tint" colorSubtype="level3">
    {children}
  </AscTag>
)

const StyledSpecialsBlock = styled(CardContainer)`

  ${/* sc-selector */ styles.ColumnStyle}:first-child > ${styles.LinkStyle} {
     border-top: ${themeColor('tint', 'level3')} 1px solid;
  }

    @media screen and ${breakpoint('min-width', 'tabletM')} {
    ${/* sc-selector */ styles.ColumnStyle}:nth-child(2) > ${styles.LinkStyle} {
      border-top: ${themeColor('tint', 'level3')} 1px solid;
    }
  }

  @media screen and ${breakpoint('min-width', 'laptop')} {
    ${/* sc-selector */ styles.ColumnStyle}:nth-child(3) > ${styles.LinkStyle} {
      border-top: ${themeColor('tint', 'level3')} 1px solid;
    }
  }

  ${/* sc-selector */ styles.ColumnStyle} > ${styles.LinkStyle} {
    border-bottom: ${themeColor('tint', 'level3')} 1px solid;
    width: 100%;
    min-height: 66px;

    &:hover > ${styles.CardStyle}
      > ${styles.CardContentStyle}
      > ${styles.HeadingStyle} {
        color: ${themeColor('secondary')};
        text-decoration: underline;
    }
  }

  ${styles.CardStyle} {
    background: none;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding: 8px 0;
    margin: 24px 8px!important;
  }

  ${styles.CardContentStyle} {
     padding: 0;
     margin-right: 16px;
  }

  ${styles.CardMediaWrapperStyle} {
    max-width: 80px;
    align-self: flex-start;
  }

  ${styles.TagStyle} {
    display: inline;
    margin-right: 5px;
    background-color: ${themeColor('tint', 'level3')};
    padding: 2px;
  }

  ${styles.RowStyle} > ${/* sc-selector */ styles.LinkStyle}:last-child {
    margin-top: 24px;
    padding: 8px 3px 8px 0;
  }
`

const CardSpecialsSubtiltle = styled(Heading)`
  @media screen and ${breakpoint('max-width', 'tabletM')} {
    margin-bottom: 16px;
  }

  @media screen and ${breakpoint('max-width', 'laptopL')} {
    margin-bottom: 16px;
  }

  @media screen and ${breakpoint('min-width', 'laptopL')} {
    margin-bottom: 24px;
  }
`

const SpecialsBlock = ({ loading, ...otherProps }) => (
  <StyledSpecialsBlock {...otherProps}>
    <Row hasMargin={false}>
      <Column wrap span={{ small: 1, medium: 2, big: 6, large: 12, xLarge: 12 }}>
        <CardSpecialsSubtiltle $as="h1">In Beeld</CardSpecialsSubtiltle>
      </Column>
    </Row>
    <Row hasMargin={false}>
      <Column wrap span={{ small: 1, medium: 2, big: 3, large: 4, xLarge: 4 }}>
        <Link href="/" linkType="blank">
          <Card horizontal loading={loading}>
            <CardContent>
              <Heading $as="h4" styleAs="h3" gutterBottom={8}>
                Veiligheidsindex
              </Heading>
              <Paragraph>
                <Tag>Dashboard</Tag>
                Hoe veilig is mijn buurt vergeleken met andere buurten en met voorgaande perioden?
              </Paragraph>
            </CardContent>
            <CardMedia>
              <Image src="https://picsum.photos/100/?random=1" alt="stadsloket" square />
            </CardMedia>
          </Card>
        </Link>
      </Column>
      <Column wrap span={{ small: 1, medium: 2, big: 3, large: 4, xLarge: 4 }}>
        <Link href="/" linkType="blank">
          <Card horizontal loading={loading}>
            <CardContent>
              <Heading $as="h4" styleAs="h3" gutterBottom={8}>
                Veiligheidsindex
              </Heading>
              <Paragraph>
                <Tag>Dashboard</Tag>
                Sub max 3 regels 14/17 #000000 Hoe veilig is mijn buurt vergelek…
              </Paragraph>
            </CardContent>
            <CardMedia>
              <Image src="https://picsum.photos/100/?random=2" alt="stadsloket" square />
            </CardMedia>
          </Card>
        </Link>
      </Column>
      <Column wrap span={{ small: 1, medium: 2, big: 3, large: 4, xLarge: 4 }}>
        <Link href="/" linkType="blank">
          <Card horizontal loading={loading}>
            <CardContent>
              <Heading $as="h4" styleAs="h3" gutterBottom={8}>
                Veiligheidsindex titel 16/20
              </Heading>
              <Paragraph>
                Sub max 3 regels 14/17 #000000 Hoe veilig is mijn buurt vergelek…
              </Paragraph>
            </CardContent>
            <CardMedia>
              <Image src="https://picsum.photos/100/?random=3" alt="stadsloket" square />
            </CardMedia>
          </Card>
        </Link>
      </Column>
      <Column wrap span={{ small: 1, medium: 2, big: 3, large: 4, xLarge: 4 }}>
        <Link href="/" linkType="blank">
          <Card horizontal loading={loading}>
            <CardContent>
              <Heading $as="h4" styleAs="h3" gutterBottom={8}>
                Veiligheidsindex titel 16/20
              </Heading>
              <Paragraph>
                <Tag>Dashboard</Tag>
                Sub max 3 regels 14/17 #000000 Hoe veilig is mijn buurt vergelek…
              </Paragraph>
            </CardContent>
            <CardMedia>
              <Image src="https://picsum.photos/100/?random=4" alt="stadsloket" square />
            </CardMedia>
          </Card>
        </Link>
      </Column>
      <Column wrap span={{ small: 1, medium: 2, big: 3, large: 4, xLarge: 4 }}>
        <Link href="/" linkType="blank">
          <Card horizontal loading={loading}>
            <CardContent>
              <Heading $as="h4" styleAs="h3" gutterBottom={8}>
                Veiligheidsindex titel 16/20
              </Heading>
              <Paragraph>
                Sub max 3 regels 14/17 #000000 Hoe veilig is mijn buurt vergelek…
              </Paragraph>
            </CardContent>
            <CardMedia>
              <Image src="https://picsum.photos/100/?random=5" alt="stadsloket" square />
            </CardMedia>
          </Card>
        </Link>
      </Column>
      <Column wrap span={{ small: 1, medium: 2, big: 3, large: 4, xLarge: 4 }}>
        <Link href="/" linkType="blank">
          <Card horizontal loading={loading}>
            <CardContent>
              <Heading $as="h4" styleAs="h3" gutterBottom={8}>
                Veiligheidsindex titel 16/20
              </Heading>
              <Paragraph>
                Sub max 3 regels 14/17 #000000 Hoe veilig is mijn buurt vergelek…
              </Paragraph>
            </CardContent>
            <CardMedia>
              <Image src="https://picsum.photos/100/?random=6" alt="stadsloket" square />
            </CardMedia>
          </Card>
        </Link>
      </Column>
      <Link linkType="with-chevron" href="/">
        Bekijk overzicht
      </Link>
    </Row>
  </StyledSpecialsBlock>
)

export default SpecialsBlock
