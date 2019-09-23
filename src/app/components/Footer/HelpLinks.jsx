import React from 'react'
import { FooterLinkList, FooterLinkListItem, Paragraph, Link } from '@datapunt/asc-ui'

const HelpLinks = () => (
  <>
    <Paragraph gutterBottom={8}>
      Heeft u een vraag en kunt u het antwoord niet vinden op deze website? Of heeft u bevindingen?
      Neem dan contact met ons op.
    </Paragraph>
    <FooterLinkList>
      <FooterLinkListItem>
        <Link href="/" variant="with-chevron">
          Veelgestelde vragen
        </Link>
      </FooterLinkListItem>
      <FooterLinkListItem>
        <Link href="/" variant="with-chevron">
          Contact opnemen
        </Link>
      </FooterLinkListItem>
      <FooterLinkListItem>
        <Link href="/" variant="with-chevron">
          Feedback geven
        </Link>
      </FooterLinkListItem>
      <FooterLinkListItem>
        <Link href="/" variant="with-chevron">
          Uitleg gebruik
        </Link>
      </FooterLinkListItem>
    </FooterLinkList>
  </>
)

export default HelpLinks
