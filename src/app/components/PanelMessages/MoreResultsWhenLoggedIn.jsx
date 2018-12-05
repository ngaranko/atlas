import React from 'react';
import Link from 'redux-first-router-link';
import Panel from '../Panel/Panel';
import { routing } from '../../routes';

const MoreResultsWhenLoggedIn = () => (
  <Panel
    isPanelVisible
    canClose
    type="warning"
  >
    <div className="qa-category-warning">
      <h3 className="c-panel__title">Meer resultaten na inloggen</h3>
      <p className="c-panel__paragraph">Medewerkers/ketenpartners van Gemeente Amsterdam
        kunnen inloggen om meer te vinden: kadastrale subjecten, vestigingen en
        maatschappelijke activiteiten. Zie <Link
          className="c-link--light qa-link-to-page-button qa-dp-link"
          to={{
            type: routing.bediening.type,
            payload: { deeplink: 'inloggen' }
          }}
        >
          Help &#62; Bediening &#62; Inloggen
        </Link>
      </p>
    </div>
  </Panel>
);

export default MoreResultsWhenLoggedIn;
