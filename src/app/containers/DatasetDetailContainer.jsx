import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { AngularWrapper } from 'react-angular';
import { isDetailLoading, getDetailTemplateUrl, getDetailData } from '../../shared/ducks/detail/selectors';
import { getUser } from '../../shared/ducks/user/user';
import { getApiSpecificationData } from '../../shared/ducks/datasets/datasets';
import { getLocationPayload } from '../../store/redux-first-router/selectors';
import { fetchDetailRequest } from '../../shared/ducks/detail/actions';

const mapStateToProps = (state) => ({
  isLoading: isDetailLoading(state),
  catalogFilters: getApiSpecificationData(state),
  user: getUser(state),
  // TODO: refactor use API_ROOT and such
  endpoint: `https://acc.api.data.amsterdam.nl/dcatd/datasets/${getLocationPayload(state).id}`,
  detailTemplateUrl: getDetailTemplateUrl(state),
  detailData: getDetailData(state)
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  onFetchDetailRequest: fetchDetailRequest
}, dispatch);

class DatasetDetailContainer extends React.Component {

  componentDidMount() {
    const { endpoint, onFetchDetailRequest } = this.props;
    onFetchDetailRequest({ endpoint });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.endpoint !== nextProps.endpoint) {
      this.props.onFetchDetailRequest({ endpoint: nextProps.endpoint });
    }
  }

  render() {
    const {
      isLoading,
      catalogFilters,
      user,
      endpoint,
      detailTemplateUrl,
      detailData
    } = this.props;
    return (
      <div className="c-dashboard__content qa-detail">
        <AngularWrapper
          moduleName={'dpDetailWrapper'}
          component="dpDetail"
          dependencies={['atlas']}
          bindings={{
            isLoading,
            catalogFilters,
            user,
            detailTemplateUrl,
            detailData
          }}
          interpolateBindings={{
            endpoint
          }}
        />
      </div>
    );
  }
}

DatasetDetailContainer.defaultProps = {
  isLoading: false,
  detailTemplateUrl: undefined,
  detailData: undefined
};

DatasetDetailContainer.propTypes = {
  isLoading: PropTypes.bool,
  catalogFilters: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  user: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  endpoint: PropTypes.string.isRequired,
  detailTemplateUrl: PropTypes.string,
  detailData: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  onFetchDetailRequest: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(DatasetDetailContainer);
