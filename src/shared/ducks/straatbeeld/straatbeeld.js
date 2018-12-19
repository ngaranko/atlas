export const STRAATBEELD_OFF = 'STRAATBEELD_OFF';

export const historyOptions = [
  { year: 0, missionType: 'bi', label: 'Meest recent', layerName: 'pano' },
  { year: 2018, missionType: 'bi', label: 'Alleen 2018', layerName: 'pano2018bi' },
  { year: 2017, missionType: 'bi', label: 'Alleen 2017', layerName: 'pano2017bi' },
  { year: 2016, missionType: 'bi', label: 'Alleen 2016', layerName: 'pano2016bi' },
  { year: 2018, missionType: 'woz', label: 'T.b.v. WOZ 2018', layerName: 'pano2018woz' },
  { year: 2017, missionType: 'woz', label: 'T.b.v. WOZ 2017', layerName: 'pano2017woz' }
];

const initialState = {
  location: null, // eg: [52.8, 4.9]
  history: historyOptions[0],
  pitch: 0,       // eg: -10
  heading: 0,     // eg: 270
  fov: 0,         // eg: 65
  image: null,    // eg: {
                  //     pattern: 'http://www.example.com/path/some-id/{this}/{that}/{thingie}.jpg',
                  //     preview: 'http://www.example.com/path/some-id/preview.jpg'
                  // }
  hotspots: [],   // eg: [{id: 'ABC124', heading: 90, distance: 18}],
  date: null,     // eg: new Date()
  isFullscreen: false,
  isInitial: true,
  isLoading: true
};

export default function StraatbeeldReducer(state = initialState, action) {
  switch (action.type) {
    case STRAATBEELD_OFF:
      return null;

    default:
      return state;
  }
}

export const setStraatbeeldOff = () => ({ type: STRAATBEELD_OFF });
