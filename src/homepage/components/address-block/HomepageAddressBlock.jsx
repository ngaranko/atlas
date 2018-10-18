import React from 'react';
import Link from 'redux-first-router-link';

import HomepageBlock from '../block/HomepageBlock';

import IconAddress from '../../../../public/images/icon-adres.svg';
import IconHr from '../../../../public/images/icon-hr.svg';
import IconKadaster from '../../../../public/images/icon-kadaster.svg';
import { features } from '../../../shared/environment';
import { routing } from '../../../app/routes';

const BLOCK_ITEMS = {
  ADRESSEN: {
    label: 'Adressentabel',
    icon: IconAddress,
    route: routing.adressen.type,
    title: 'Bekijk Adressentabel'
  },
  HANDELSREGISTER: {
    label: 'Handelsregister-tabel',
    icon: IconHr,
    route: routing.vestigingen.type,
    title: 'Bekijk handelsregister-tabel'
  },
  KADASTER: {
    label: 'Kadaster-tabel',
    icon: IconKadaster,
    route: routing.vestigingen.type,
    title: 'Bekijk kadaster-tabel'
  }
};

const HomepageAddressBlock = () => (
  <HomepageBlock
    linkAction={{ type: routing.adressen.type }}
    title="Adressentabel"
    description="Selecteer en download als spreadsheet"
    hasTallDescription
  >
    {Object.keys(BLOCK_ITEMS).map((key) => {
      const extraClass = (key === 'KADASTER' && !features.eigendommen) ? 'homepage-block__item--invisible' : '';
      const { label, icon: Icon, route, title } = BLOCK_ITEMS[key];
      return (
        <div key={key} className={`homepage-block__item ${extraClass}`}>
          <Link
            className="c-link homepage-block__link"
            title={title}
            to={{ type: route }}
          >
            <span className="homepage-block__icon">
              <Icon />
            </span>
            <span className="homepage-block__label">
              {label}
            </span>
          </Link>
        </div>
      );
    })}
  </HomepageBlock>
);

export default HomepageAddressBlock;
