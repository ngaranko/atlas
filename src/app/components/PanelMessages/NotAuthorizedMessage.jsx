import React from 'react';
import Link from 'redux-first-router-link';
import { AngularWrapper } from 'react-angular';
import { routing } from '../../routes';

const NotAuthorizedPanel = () => (
  <AngularWrapper
    moduleName={'dpPanelWrapper'}
    component="dpPanel"
    className="qa-disabled-message"
    dependencies={['atlas']}
    bindings={{
      isPanelVisible: true,
      canClose: true
    }}
    interpolateBindings={{
      type: 'warning'
    }}
  >
    <div>
      <p className="c-panel__paragraph">
        Medewerkers met speciale bevoegdheden kunnen inloggen om kadastrale objecten met zakelijk
        rechthebbenden te bekijken.
      </p>
      <p className="c-panel__paragraph">
        Zie <Link className="c-link--light qa-link-to-page-button qa-dp-link" to={{ type: routing.bediening.type, payload: { deeplink: 'inloggen' } }}>Help &#62; Bediening &#62; Inloggen</Link>
      </p>
    </div>
  </AngularWrapper>
);

export default NotAuthorizedPanel;
