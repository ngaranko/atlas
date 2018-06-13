import { DivIcon } from 'leaflet';

import ICON_CONFIG from './icon-config.constant';

const dataSelectionIcon = (count) => new DivIcon({
  ...ICON_CONFIG.DATA_SELECTION,
  popupAnchor: null,
  className: 'o-highlight-cluster',
  html: `
    <div
      aria-label="Cluster met ${count} appartementen"
      class="o-highlight-cluster__text"
    >
      ${count}
    </div>
  `
});

export default dataSelectionIcon;
