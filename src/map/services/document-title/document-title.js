import { selectActivePanelLayers } from '../../ducks/panel-layers/map-panel-layers';

export function getTitle(state) {
  return new Promise((resolve) => {
    const overlays = selectActivePanelLayers(state).map((layer) => layer.title).join(', ');
    const overlaysTitle = overlays.length ? `${overlays} | ` : '';

    resolve(`${overlaysTitle}Grote kaart`);
  });
}

export default { getTitle };
