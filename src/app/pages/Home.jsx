import React from 'react';
import PropTypes from 'prop-types';
import Link from 'redux-first-router-link';
import { AngularWrapper } from 'react-angular';
import { routing, toPanorama } from '../routes';
import HomepageAddressBlockWrapper
  from '../../homepage/wrappers/address-block/HomepageAddressBlockWrapper';
import Video from '../components/Video/Video';
import Footer from '../components/Footer/Footer';
import HOMEPAGE_CONFIG from '../pages';

const INSTRUCTION_LINKS = {
  BEDIENING: {
    route: routing.bediening.type,
    title: 'Bediening'
  },
  GEGEVENS: {
    route: routing.gegevens.type,
    title: 'Gegevens'
  },
  APIS: {
    route: routing.apis.type,
    title: 'API\'s'
  }
};

const ABOUT_LINKS = {
  PRIVACY_BEVEILIGING: {
    route: routing.privacy_beveiliging.type,
    title: 'Privacy en informatiebeveiliging'
  },
  BESCHIKBAAR_KWALITEIT: {
    route: routing.beschikbaar_kwaliteit.type,
    title: 'Beschikbaarheid en kwaliteit data'
  },
  BEHEER_WERKWIJZE: {
    route: routing.beheer_werkwijze.type,
    title: 'Technisch beheer en werkwijze'
  }
};

class Home extends React.Component {
  static togglePlay(ref, play) {
    if (play) {
      ref.play();
    } else {
      ref.pause();
      ref.currentTime = 0; // eslint-disable-line no-param-reassign
    }
  }
  constructor(...options) {
    super(...options);

    this.panoramaPlayer = null;
    this.mapPlayer = null;
  }

  render() {
    const { showFooter } = this.props;
    const { togglePlay } = this.constructor;

    return (
      <div
        className={`c-dashboard__column
        c-dashboard__content
        u-col-sm--12
        qa-dashboard__column--right`}
      >
        <div className="c-dashboard__page o-max-width">
          <div className="c-dashboard__page-inner o-max-width__inner u-gutter">
            <div className="qa-page">
              <div className="c-homepage u-padding__top--4">
                <div className="u-grid">
                  <div className="u-row">
                    <div className="u-col-sm--9">
                      <div className="qa-map-link">
                        <Link
                          to={{ type: routing.map.type }}
                          className={`c-homepage__block
                          c-homepage__block--left
                          c-homepage__block--tall`}
                          onMouseOver={() => togglePlay(this.mapPlayer, true)}
                          onMouseOut={() => togglePlay(this.mapPlayer, false)}
                          onBlur={() => togglePlay(this.mapPlayer, false)}
                          onFocus={() => togglePlay(this.mapPlayer, true)}
                        >
                          <div className="c-video">
                            <Video
                              setRef={(element) => {
                                this.mapPlayer = element;
                              }}
                              poster="/assets/video/map.png"
                              src="/assets/video/map.mp4"
                              type="video/mp4"
                            />
                          </div>
                          <div className="c-homepage__block-button">
                            <div className="o-btn--transparent">Data op de kaart</div>
                            <div className="c-homepage__block-details">Selecteer kaartlagen, vind
                              gegevens op
                              een punt in de kaart, meet of teken een gebied
                            </div>
                          </div>
                        </Link>
                      </div>
                    </div>
                    <div className="u-col-sm--3">
                      <div>
                        <a
                          href="https://maps.amsterdam.nl"
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`c-homepage__block
                          c-homepage__block--right
                          c-homepage__block--tall
                          c-homepage__block--amsterdam-maps`}
                        >
                          <div className="c-homepage__block-button c-homepage__block-button--tall">
                            <div className="c-homepage__block-details-title o-btn--transparent">Meer
                              op Maps
                              Amsterdam
                            </div>
                            <div className="c-homepage__block-details">Ruimtelijke themakaarten (nog
                              te
                              integreren)
                            </div>
                          </div>
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="u-row">
                    <div className="u-col-sm--6 c-homepage__block--data-selection">
                      <div
                        className={`c-homepage__block
                        c-homepage__block--left
                        c-homepage__block--tall c-homepage__block--datasets`}
                      >
                        <Link
                          className="c-homepage__block-button"
                          to={{ type: routing.catalogus.type }}
                        >
                          <div className="o-btn--transparent">Datasetcatalogus</div>
                          <div className="c-homepage__block-details">Blader door datasets
                            (verzamelingen
                            gegevens)
                          </div>
                        </Link>
                        <AngularWrapper
                          moduleName="dpCatalogusThemesWrapper"
                          component="dpCatalogusThemes"
                          dependencies={['atlas']}
                        />
                      </div>
                    </div>

                    <div
                      className="u-col-sm--3 c-homepage__block--address"
                      id="homepage-address-block"
                    >
                      <HomepageAddressBlockWrapper />
                    </div>

                    <div className="u-col-sm--3">
                      <div className="qa-straatbeeld-link">
                        <Link
                          to={toPanorama(HOMEPAGE_CONFIG.PANORAMA.id)}
                          className={`c-homepage__block
                          c-homepage__block--right
                          c-homepage__block--tall`}
                          onMouseOver={() => togglePlay(this.panoramaPlayer, true)}
                          onMouseOut={() => togglePlay(this.panoramaPlayer, false)}
                          onBlur={() => togglePlay(this.panoramaPlayer, false)}
                          onFocus={() => togglePlay(this.panoramaPlayer, true)}
                        >
                          <Video
                            setRef={(element) => {
                              this.panoramaPlayer = element;
                            }}
                            poster="/assets/video/panorama.jpg"
                            src="/assets/video/panorama.mp4"
                            type="video/mp4"
                          />
                          <div className="c-homepage__block-button">
                            <div className="o-btn--transparent">Panoramabeelden</div>
                            <div className="c-homepage__block-details">Kijk rond ter plaatse</div>
                          </div>
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="u-row">
                    <div className="c-homepage__news">
                      <div className="u-col-sm--9">
                        <div>
                          <h1 className="u-padding__left--3 c-homepage__news-header">Nieuws</h1>
                          <div>
                            <AngularWrapper
                              moduleName="dpUserContentWidgetWrapper"
                              component="dpUserContentWidget"
                              dependencies={['atlas']}
                              bindings={{
                                limitTo: 3
                              }}
                              interpolateBindings={{
                                type: 'news'
                              }}
                            />
                          </div>
                          <div className="u-padding__left--3 c-homepage__news-show-more">
                            <Link
                              to={{ type: routing.nieuws.type }}
                              className="o-btn o-btn--link"
                            >Nieuwsoverzicht
                            </Link>
                          </div>
                        </div>
                      </div>
                      <div className="u-col-sm--3">
                        <div className="u-margin__left--1 c-homepage__news-instructions">
                          <h2 className="c-homepage__news-instructions-title">Instructies</h2>
                          {Object.keys(INSTRUCTION_LINKS).map((key) => (
                            <div key={key} className="c-user-content-widget__entry">
                              <Link
                                to={INSTRUCTION_LINKS[key].route}
                                className="o-btn o-btn--link"
                              >{INSTRUCTION_LINKS[key].title}
                              </Link>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="u-clearfix" />
                    </div>
                  </div>
                </div>
                <div className="u-row">
                  <div className="c-homepage__text">
                    <div className="u-col-sm--8">
                      <div className="u-margin__left--3 c-homepage__visie">
                        <h1 className="c-homepage__visie-header">Amsterdam City Data</h1>
                        <p className="c-homepage__visie-paragraph">Amsterdam beschikt over een schat
                          aan
                          gegevens over de stad. Via dit dataportaal stellen wij, in samenwerking
                          met
                          onze
                          partners, deze gegevens beschikbaar. Samen met u willen wij werken aan
                          vernieuwende
                          datatoepassingen voor Amsterdam als leefbare stad.</p>
                        <p className="c-homepage__visie-paragraph">Amsterdam City Data blijft zich
                          ontwikkelen. Het aantal beschikbare gegevens en functionaliteiten van dit
                          dataportaal zal verder groeien. Dit stemmen we af op de behoefte in de
                          stad.</p>
                        <p className="c-homepage__visie-paragraph">Op dit moment is het dataportaal
                          met name
                          geschikt voor professionals, zoals onderzoekers en uiteraard de
                          medewerkers
                          en
                          ketenpartners van Gemeente Amsterdam. Daarnaast ondersteunen we
                          ontwikkelaars die
                          gegevens gebruiken in eigen toepassingen.</p>
                        <div className="c-homepage__visie-panel">
                          <AngularWrapper
                            moduleName={'dpPanelWrapper'}
                            component="dpPanel"
                            dependencies={['atlas']}
                            bindings={{
                              isPanelVisible: true,
                              canClose: false
                            }}
                            interpolateBindings={{
                              type: 'info'
                            }}
                          >
                            <p
                              className={`c-homepage__visie-paragraph
                              c-homepage__visie-paragraph--panel`}
                            >
                              Meer weten over data en de gemeente Amsterdam? Informatie over beleid,
                              samenwerkingsverbanden, inspirerende voorbeelden van toepassingen en
                              informatie
                              voor de pers vindt u op:
                            </p>
                            <a
                              className="c-link c-link--arrow"
                              href="https://amsterdam.nl/data"
                              rel="noopener noreferrer"
                              target="_blank"
                            >
                              amsterdam.nl/data
                            </a>
                          </AngularWrapper>
                        </div>
                      </div>
                    </div>
                    <div className="u-col-sm--1">&nbsp;</div>
                    <div className="u-col-sm--3">
                      <div className="u-margin__left--1 c-homepage__beleid">
                        <div>
                          <div className="c-user-content-widget__beleid-zie-ook">Over</div>
                          {Object.keys(ABOUT_LINKS).map((key) => (
                            <div key={key} className="c-user-content-widget__entry">
                              <Link
                                to={ABOUT_LINKS[key].route}
                                className="o-btn o-btn--link"
                              >
                                <div
                                  className={`c-user-content-widget__short
                                  s-cms-widget-content
                                  s-cms-widget-content--inline`}
                                >
                                  <p>{ABOUT_LINKS[key].title}</p>
                                </div>
                              </Link>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {showFooter &&
          <Footer />
          }
        </div>
      </div>
    );
  }
}

Home.propTypes = {
  showFooter: PropTypes.bool
};

Home.defaultProps = {
  showFooter: true
};

export default Home;
