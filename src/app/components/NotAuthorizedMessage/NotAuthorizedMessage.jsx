import React from 'react';
import PropTypes from 'prop-types';
import { AngularWrapper } from 'react-angular';

const NotAuthorizedPanel = ({ dataset }) => (
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
        Zie {dataset}
      </p>
    </div>
  </AngularWrapper>
);

NotAuthorizedPanel.propTypes = {
  dataset: PropTypes.string.isRequired
};

export default NotAuthorizedPanel;
