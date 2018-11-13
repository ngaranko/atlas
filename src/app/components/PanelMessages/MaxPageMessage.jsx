import React from 'react';
import PropTypes from 'prop-types';
import { AngularWrapper } from 'react-angular';

const MaxPageMessage = ({ maxAvailablePages }) => (
  <AngularWrapper
    moduleName={'dpPanelWrapper'}
    component="dpPanel"
    dependencies={['atlas']}
    bindings={{
      isPanelVisible: true,
      canClose: true
    }}
    interpolateBindings={{
      type: 'warning'
    }}
  >
    <div className="qa-message-max-pages">
      <h2 className="c-panel__title">Deze pagina kan niet worden getoond</h2>
      <p className="c-panel__paragraph">
        Alleen de eerste {{ maxAvailablePages }} pagina&apos;s kunnen
        worden
        weergegeven (om technische redenen). Bij
        downloaden worden wel alle resultaten opgenomen.
      </p>
      <p className="c-panel__paragraph">
        Tip: Gebruik de download-knop om alle resultaten te bekijken. Of voeg
        meer
        filtercriteria
        toe voor specifiekere resultaten.
      </p>
    </div>
  </AngularWrapper>
);

MaxPageMessage.propTypes = {
  maxAvailablePages: PropTypes.number.isRequired
};

export default MaxPageMessage;
