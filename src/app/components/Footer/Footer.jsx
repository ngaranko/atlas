import React from 'react';

const FooterComponent = () => (
  <footer className="c-dashboard__footer o-max-width">
    <div className="c-dashboard__footer-content u-row">
      <div className="u-col-sm--8">
        <div className="u-margin__left--2 c-dashboard__proclaimer">
          <h2 className="c-dashboard__proclaimer-header">Proclaimer</h2>
          <p className="c-dashboard__proclaimer-paragraph">Gemeente Amsterdam
            biedt met City Data een voorziening waar data voor iedereen
            beschikbaar zijn en hergebruikt mogen worden. De gegevens
            worden aangeboden door gemeentelijke en externe partijen. De
            eigenaren van deze gegevens zijn primair verantwoordelijk
            voor de kwaliteit van hun gepubliceerde data. Opmerkingen en
            aanvullingen op de gegevens kunt u <a
              className="c-link--inverse"
              href="mailto:terugmelding.basisinformatie@amsterdam.nl">melden</a>.
          </p>
          <p className="c-dashboard__proclaimer-paragraph">
            <a
              className="o-btn o-btn--link--inverse"
              href="#?mpb=topografie&mpz=11&mpv=52.3731081:4.8932945&pgn=content-overzicht&pgt=proclaimer"
            >Lees de hele proclaimer</a>
          </p>
        </div>
      </div>
      <div className="u-col-sm--3 u-col-sm--offset-1">
        <div className="c-dashboard__social">
          <h2 className="c-dashboard__social-header">Volg de gemeente</h2>
          <div className="c-dashboard__social-link">
            <a
              className="o-btn--link--inverse"
              href="https://twitter.com/AmsterdamNL"
              rel="external"
              target="_blank" rel="noopener">Twitter</a>
          </div>
          <div className="c-dashboard__social-link">
            <a
              className="o-btn o-btn--link--inverse"
              href="https://www.facebook.com/gemeenteamsterdam"
              rel="external"
              target="_blank" rel="noopener">Facebook</a>
          </div>
          <div className="c-dashboard__social-link">
            <a
              className="o-btn o-btn--link--inverse"
              href="https://www.linkedin.com/company/gemeente-amsterdam"
              rel="external"
              target="_blank" rel="noopener">LinkedIn</a>
          </div>
          <div className="c-dashboard__social-link">
            <a
              className="o-btn o-btn--link--inverse"
              href="https://github.com/Amsterdam"
              rel="external"
              target="_blank" rel="noopener">GitHub</a>
          </div>
        </div>
      </div>
      <div className="u-clearfix"></div>
    </div>
  </footer>
);

export default FooterComponent;
