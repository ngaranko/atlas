module.exports = {
  defaults: {
      timeout: 10000,
      standard: 'WCAG2AA'
  },
  urls: [
      // homepage
      'http://localhost:8080/#?mpb=topografie&mpz=11&mpv=52.3731081:4.8932945&pgn=home',

      // adressenlijst
      'http://localhost:8080/#?dsd=bag&dsp=1&dsv=TABLE&mpb=topografie&mpz=11&mpv=52.3731081:4.8932945',

      // straatbeeld
      'http://localhost:8080/#?mpb=topografie&mpz=11&mpo=pano::T&mpv=52.3730353:4.8932471&pgn=home&sbf=Cu&sbh=aS&sbi=TMX7315120208-000073_pano_0005_000449&sbl=ZRWBl:3JJZP'
  ]
}
