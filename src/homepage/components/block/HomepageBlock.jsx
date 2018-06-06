import React from 'react';
import PropTypes from 'prop-types';

import RouteLinkWrapper from '../../../shared/wrappers/route-link/RouteLinkWrapper';

import IconAddress from '../../../../public/images/icon-adres.svg';
import IconHr from '../../../../public/images/icon-hr.svg';
import IconKadaster from '../../../../public/images/icon-kadaster.svg';

import './_homepage-block.scss';

const HomepageBlock = (props) => (
  <div
    className="homepage-block c-homepage__block c-homepage__block--tall"
  >
    <div className={'homepage-block__item'}>
      <RouteLinkWrapper
        inline={true}
        tagName={'a'}
        className={'c-link'}
        hoverText={'Adressen'}
        type={'FETCH_DATA_SELECTION'}
        payload={{ dataset: 'bag', filters: {}, page: 1 }}
      >
        <span className="homepage-block__icon">
          <IconAddress />
        </span>
        <span className="homepage-block__label">
          Adressentabel met een lange title
        </span>
      </RouteLinkWrapper>
    </div>
    <div className={'homepage-block__item'}>
      <RouteLinkWrapper
        inline={true}
        tagName={'a'}
        className={'c-link'}
        hoverText={'Adressen'}
        type={'FETCH_DATA_SELECTION'}
        payload={{ dataset: 'hr', filters: {}, page: 1 }}
      >
        <span className="homepage-block__icon">
          <IconHr />
        </span>
        <span className="homepage-block__label">
          Handelsregister-tabel
        </span>
      </RouteLinkWrapper>
    </div>


    <RouteLinkWrapper
      inline={false}
      tagName={'a'}
      className={'c-homepage__block-button'}
      hoverText={'Adressen'}
      type={'FETCH_DATA_SELECTION'}
      payload={{ dataset: 'bag', filters: {}, page: 1 }}
    >
      <div className="o-btn--transparent">Adressentabel</div>
      <div className="c-homepage__block-details">Blader door adressen</div>
    </RouteLinkWrapper>


  </div>
);

HomepageBlock.propTypes = {

};

HomepageBlock.defaultProps = {

};

export default HomepageBlock;
