import {
  Heading,
  Link,
  themeColor,
  themeSpacing,
  Card,
  CardContent,
  CardMedia,
  Icon,
  Paragraph,
} from '@datapunt/asc-ui'
import styled from '@datapunt/asc-core'
import RouterLink from 'redux-first-router-link'
import React from 'react'
import { toDataDetail } from '../../../store/redux-first-router/actions'

// Check if these icons must be moved to @datapunt/asc-assets
import { ReactComponent as IconBuilding } from '../../../shared/assets/icons/data/IconBuilding.svg'
import { ReactComponent as IconChurch } from '../../../shared/assets/icons/data/IconChurch.svg'
import { ReactComponent as IconFactory } from '../../../shared/assets/icons/data/IconFactory.svg'
import { ReactComponent as IconHandshake } from '../../../shared/assets/icons/data/IconHandshake.svg'
import { ReactComponent as IconHouse } from '../../../shared/assets/icons/data/IconHouse.svg'
import { ReactComponent as IconMap } from '../../../shared/assets/icons/data/IconMap.svg'
import { ReactComponent as IconMarker } from '../../../shared/assets/icons/data/IconMarker.svg'
import { ReactComponent as IconMarkerMap } from '../../../shared/assets/icons/data/IconMarkerMap.svg'
import { ReactComponent as IconOffice } from '../../../shared/assets/icons/data/IconOffice.svg'
import { ReactComponent as IconPark } from '../../../shared/assets/icons/data/IconPark.svg'
import { ReactComponent as IconSkyscraper } from '../../../shared/assets/icons/data/IconSkyscraper.svg'

const StyledCard = styled(Card)`
  border: ${themeColor('tint', 'level3')} 1px solid;
  justify-content: flex-start;
  width: inherit;
  margin: ${themeSpacing(2, 0)};
`

const StyledHeading = styled(Heading)`
  cursor: pointer;
`

const StyledCardContent = styled(CardContent)`
  padding: ${themeSpacing(2)};
  min-height: inherit;
  width: calc(100% - ${themeSpacing(19)});
`

const StyledCardMedia = styled(CardMedia)`
  max-width: ${themeSpacing(19)};
`

const StyledIcon = styled(Icon)`
  background: ${themeColor('tint', 'level2')};
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;

  & svg {
    width: 60px;
    height: 60px;
  }
`

const StyledParagraph = styled(Paragraph)`
  white-space: nowrap;
  overflow: hidden;
  display: block;
  text-overflow: ellipsis;
`

const StyledParagraphLink = styled(Link)`
  font-weight: normal;
  color: inherit;
`

const ICONS = {
  adressen: <IconMarker />,
  gebieden: <IconMap />,
  kadastraal_object: <IconBuilding />,
  kadastraal_subject: <IconOffice />,
  maatschappelijke_activiteit: <IconHandshake />,
  meetbouten: <IconHouse />,
  monumenten: <IconChurch />,
  openbare_ruimtes: <IconPark />,
  panden: <IconSkyscraper />,
  straatnamen: <IconMarkerMap />,
  vestiging: <IconFactory />,
}

const DataCard = ({ type, label, count, results, ...otherProps }) => (
  <StyledCard key={type} horizontal {...otherProps}>
    <StyledCardMedia>
      <StyledIcon>{ICONS[type]}</StyledIcon>
    </StyledCardMedia>
    <StyledCardContent>
      <div>
        <StyledHeading $as="h4">
          <Link>{`${label} (${count})`}</Link>
        </StyledHeading>
      </div>

      <div>
        <StyledParagraph>
          {results.map((location, index) => (
            <>
              <StyledParagraphLink
                // TODO: return correct type and subtype from the api to construct this link
                to={toDataDetail([location.id, location.type, location.subtype])}
                $as={RouterLink}
              >
                {location.label}
              </StyledParagraphLink>
              {index !== results.length - 1 ? `, ` : ''}
            </>
          ))}
        </StyledParagraph>
      </div>
    </StyledCardContent>
  </StyledCard>
)

export default DataCard
