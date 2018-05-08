import ReactDOM from 'react-dom';

angular
    .module('atlas')
    .component('dpMapWrapper', {
        templateUrl: 'modules/atlas/components/dashboard/wrappers/map-wrapper/map-wrapper.html', //eslint-disable-line
        controller: DpMapWrapper,
        controllerAs: 'vm'
    });

DpMapWrapper.$inject = ['$timeout', '$window'];

function DpMapWrapper ($timeout, $window) {
    const React = $window.React;
    const render = $window.render;
    const MapWrapper = $window.MapWrapper;
    let graphNode;

    const mountReactComponents = () => {
        graphNode = document.getElementById('map-wrapper');
        /* istanbul ignore next */
        if (graphNode) {
            render(React.createElement(MapWrapper), graphNode);
        }
    };

    $timeout(() => {
        mountReactComponents();
    });

    this.$onDestroy = () => {
        if (graphNode) {
            ReactDOM.unmountComponentAtNode(graphNode);
        }
    };
}
