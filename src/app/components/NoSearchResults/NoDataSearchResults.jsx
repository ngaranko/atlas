import React from 'react'
import { Heading, Paragraph } from '@datapunt/asc-ui'
import { StyledList, StyledListItem } from './NoSearchResults'

const NoDataSearchResults = ({ query, unauthorized }) => (
  <div>
    <Paragraph>{`Er zijn geen resultaten gevonden met \`${query}\` binnen de categorie \`Data\``}</Paragraph>
    <Heading $as="h2">Algemene zoeksuggesties</Heading>
    <Paragraph>Maak de zoekcriteria eventueel minder specifiek. </Paragraph>
    <Paragraph>Zoeken binnen ‘Data’ kan op de volgende onderdelen:</Paragraph>
    <Heading $as="h3">Adressen, straatnamen en andere openbare ruimtes</Heading>
    <StyledList>
      <StyledListItem>
        Naam of postcode (eventueel met huisnummer, letter en toevoeging).
      </StyledListItem>
      <StyledListItem>
        BAG-identificatie (landelijke 16-cijferig nummer van openbare ruimte, nummeraanduiding,
        verblijfsobject, standplaats, of ligplaats).
      </StyledListItem>
      <StyledListItem>Blader (en filter) door de adressentabel.</StyledListItem>
    </StyledList>
    <Heading $as="h3">Panden</Heading>
    <Paragraph>Zoek panden op pandnaam en bag-identificatie.</Paragraph>
    <Heading $as="h3">Kadastrale objecten</Heading>
    <StyledList>
      <StyledListItem>
        Zoek kadastrale objecten op (delen van) kadastrale aanduiding.
      </StyledListItem>
      <StyledListItem>Blader (en filter) door de kadastertabel.</StyledListItem>
    </StyledList>
    <Heading $as="h3">Gebieden</Heading>
    <Paragraph>Zoek gebieden op naam en bouwblokken op bouwblokcode.</Paragraph>
    <Heading $as="h3">Meetbouten</Heading>
    <Paragraph>Zoek gebieden op meetboutnummer of bouwblokcode.</Paragraph>
    <Heading $as="h3">Monumenten</Heading>
    <Paragraph>Zoek monumenten op naam.</Paragraph>
    <br />
    <br />
    <Heading $as="h2">Ingelogde medewerkers</Heading>
    {unauthorized && (
      <Paragraph>
        Medewerkers/ketenpartners van Gemeente Amsterdam kunnen inloggen om meer gegevens te zien.
      </Paragraph>
    )}
    <Heading $as="h3">Vestigingen</Heading>
    <StyledList>
      <StyledListItem>
        Zoek vestigingen (alleen voor ingelogde gebruikers) op handelsnaam of vestigingsnummer
      </StyledListItem>
      <StyledListItem>Blader (en filter) door de handelsregistertabel.</StyledListItem>
    </StyledList>
    <Heading $as="h3">Maatschappelijke activiteiten</Heading>
    <Paragraph>
      Zoek maatschappelijke activiteiten (alleen voor ingelogde gebruikers) op handelsnaam of
      KvK-nummer.
    </Paragraph>
    <Heading $as="h3">Kadastrale subjecten</Heading>
    <Paragraph>
      Zoek kadastrale subjecten (natuurlijke en niet-natuurlijke personen, alleen voor ingelogde
      gebruikers) op naam.
    </Paragraph>
  </div>
)

export default NoDataSearchResults
