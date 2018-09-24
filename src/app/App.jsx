import React from 'react';
import { Route, Switch, withRouter } from 'react-router';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { AngularWrapper } from 'react-angular';
import Map from './pages/Map';
import Piwik from './components/Piwik/Piwik';
import ContentPage, { PAGE_NAMES, PAGE_TYPES } from './pages/ContentPage';
import routes from './routes';

// TodoReactMigration: implement logic
const App = ({ hasMaxWidth, isFullHeight, pageType, visibilityError, location, columnSizes }) => {
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
              <Route
                exact
                path={routes.home}
                component={() =>
                  <ContentPage name={PAGE_NAMES.home} showFooter columnSizes={columnSizes} />
                }
              />
              <Route path="/map" component={Map} />
              <Route
                path={routes.help}
                component={() => (
                  <ContentPage
                    name={PAGE_NAMES.contentOverview}
                    type={PAGE_TYPES.help}
                    columnSizes={columnSizes}
                  />
                )}
              />
              <Route
                path={routes.bediening}
                component={() => (
                  <ContentPage
                    name={PAGE_NAMES.contentOverview}
                    type={PAGE_TYPES.howTo}
                    columnSizes={columnSizes}
                  />
                )}
              />
              <Route
                path={routes.apis}
                component={() => (
                  <ContentPage
                    name={PAGE_NAMES.contentOverview}
                    type={PAGE_TYPES.apis}
                    columnSizes={columnSizes}
                  />
                )}
              />
              <Route
                path={routes.gegevens}
                component={() => (
                  <ContentPage
                    name={PAGE_NAMES.contentOverview}
                    type={PAGE_TYPES.info}
                    columnSizes={columnSizes}
                  />
                )}
              />
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
  visibilityError: false,
  columnSizes: { // determineColumnSizes in dashboard-columns
    right: 12,
    middle: 12
  }
};

App.propTypes = {
  hasMaxWidth: PropTypes.bool,
  isFullHeight: PropTypes.bool,
  pageType: PropTypes.string, // state.page && state.page.type ? state.page.type : '',
  visibilityError: PropTypes.bool, // vm.visibility.error
  location: PropTypes.shape({
    pathname: PropTypes.string
  }).isRequired,
  columnSizes: PropTypes.shape({
    right: PropTypes.number,
    middle: PropTypes.number
  })
};

export default withRouter(App);
