const mockFetchResponse =
  [
    {
      label: 'Straatnamen',
      content: [
        {
          _display: 'Dijkbraak',
          uri: 'bag/openbareruimte/03630000001528/'
        },
        {
          _display: 'Dijkdwarsstraat',
          uri: 'bag/openbareruimte/03630000001970/'
        },
        {
          _display: 'Dijkgraafplein',
          uri: 'bag/openbareruimte/03630000003257/'
        }
      ]
    },
    {
      label: 'Gebieden',
      content: [
        {
          _display: 'Hoge Dijk (buurt)',
          uri: 'gebieden/buurt/03630000000491/'
        }
      ]
    },
    {
      label: 'Monumenten',
      content: [
        {
          _display: 'DIJKLICHAAM SPAARNDAMMERDIJK',
          uri: 'monumenten/monumenten/1871732e-783e-4890-8759-793c1c1927af/'
        },
        {
          _display: 'Dijkstraat 49',
          uri: 'monumenten/monumenten/6eaa9645-0564-4df1-82a5-4ed8659945ae/'
        },
        {
          _display: 'DIJKLICHAAM SPAARNDAMMERDIJK',
          uri: 'monumenten/monumenten/e56dd328-0db8-4b26-be54-a51b4e752a1a/'
        }
      ]
    },
    {
      label: 'Datasets',
      content: [
        {
          _display: 'Registratie actueel hoogtebestand Nederland (AHN)',
          uri: 'dcatd/datasets/registratie-actueel-hoogtebestand-nederland-ahn'
        }
      ]
    }
  ];

export default {
  mockFetchResponse
};
