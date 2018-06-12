import React from 'react';

import HomepageBlock from '../block/HomepageBlock';

import IconAddress from '../../../../public/images/icon-adres.svg';
import IconHr from '../../../../public/images/icon-hr.svg';
import IconKadaster from '../../../../public/images/icon-kadaster.svg';

const HomepageAddressBlock = (props) => (
  <HomepageBlock
    blockLink={{
      payload: { dataset: 'bag', filters: {}, page: 1 },
      type: 'FETCH_DATA_SELECTION'
    }}
    title={'Adressentabel'}
    description={'Selecteer en download als spreadsheet'}
    hasTallDescription={true}
  >

    <div className={'homepage-block__item'}>
      <RouteLinkWrapper
        inline={true}
        tagName={'a'}
        className={'c-link homepage-block__link'}
        hoverText={'Bekijk Adressentabel'}
        type={'FETCH_DATA_SELECTION'}
        payload={{ dataset: 'bag', filters: {}, page: 1 }}
      >
        <span className="homepage-block__icon">
          <IconAddress />
        </span>
        <span className="homepage-block__label">
          Adressentabel
        </span>
      </RouteLinkWrapper>
    </div>

    <div className={'homepage-block__item'}>
      <RouteLinkWrapper
        inline={true}
        tagName={'a'}
        className={'c-link homepage-block__link'}
        hoverText={'Bekijk handelsregister-tabel'}
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

    <div className={'homepage-block__item'}>
      <RouteLinkWrapper
        inline={true}
        tagName={'a'}
        className={'c-link homepage-block__link'}
        hoverText={'Bekijk Kadaster-tabel'}
        type={'FETCH_DATA_SELECTION'}
        payload={{ dataset: 'brk', filters: {}, page: 1 }}
      >
        <span className="homepage-block__icon">
          <IconKadaster />
        </span>
        <span className="homepage-block__label">
          Kadaster-tabel
        </span>
      </RouteLinkWrapper>
    </div>

  </HomepageBlock>
);

export default HomepageAddressBlock;
