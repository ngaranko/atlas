import React from 'react';
import { Route, Switch, withRouter } from 'react-router';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { AngularWrapper } from 'react-angular';
import Home from './pages/Home';
import Map from './pages/Map';
import Help from './pages/Help';
import Piwik from './components/Piwik/Piwik';

// TodoReactMigration: implement logic
const App = ({ hasMaxWidth, isFullHeight, pageType, visibilityError, location }) => {
  const isHomePage = location.pathname === '/';
  const rootClasses = classNames({
    'c-dashboard--max-width': hasMaxWidth,
    'c-dashboard--full-height': isFullHeight,
    'c-dashboard--homepage': isHomePage
  });
  const bodyClasses = classNames({
    'c-dashboard__body--error': visibilityError
  });
  return (
    <div className={`c-dashboard c-dashboard--page-type-${pageType} ${rootClasses}`}>
      <Piwik />
      <AngularWrapper
        moduleName={'dpHeaderWrapper'}
        component="dpHeader"
        dependencies={['atlas']}
        bindings={{
          isHomePage
        }}
        interpolateBindings={{
          hasMaxWidth
        }}
      />
      <AngularWrapper
        moduleName={'dpErrorWrapper'}
        component="dpError"
        dependencies={['atlas']}
        bindings={{
          isHomePage,
          visibilityError
        }}
        interpolateBindings={{
          hasMaxWidth
        }}
      />
      <div className={`c-dashboard__body ${bodyClasses}`}>
        <div className="u-grid u-full-height">
          <div className="u-row u-full-height">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/map" component={Map} />
              <Route path="/help" component={Help} />
            </Switch>
          </div>
        </div>
      </div>
    </div>
  );
};

App.defaultProps = {
  hasMaxWidth: true,
  isFullHeight: true,
  pageType: '',
  visibilityError: false
};

App.propTypes = {
  hasMaxWidth: PropTypes.bool,
  isFullHeight: PropTypes.bool,
  pageType: PropTypes.string, // state.page && state.page.type ? state.page.type : '',
  visibilityError: PropTypes.bool, // vm.visibility.error
  location: PropTypes.shape({
    pathname: PropTypes.string
  }).isRequired
};

export default withRouter(App);
