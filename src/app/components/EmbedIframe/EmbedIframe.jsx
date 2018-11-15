import React from 'react';
import { getIframeUrl } from '../../../shared/services/embed-url/embed-url';
import styles from './_embedIframe.scss';

const EmbedIframeComponent = () => (
  <iframe
    title="Grote kaart | Dataportaal"
    id="atlas-iframe-map"
    className={styles['c-embed-iframe']}
    width="500"
    height="400"
    src={getIframeUrl()}
    frameBorder="0"
  />
);

export default EmbedIframeComponent;
