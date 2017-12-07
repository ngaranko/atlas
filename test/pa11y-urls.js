module.exports = [
    {
        name: 'homepage',
        url: 'http://localhost:8080/#?mpb=topografie&mpz=11&mpv=52.3731081:4.8932945&pgn=home'
    },
    {
        name: 'adressenlijst',
        url: 'http://localhost:8080/#?dsd=bag&dsp=1&dsv=TABLE&mpb=topografie&mpz=11&mpv=52.3731081:4.8932945',
        rootElement: '.c-dashboard__body'
    },
    {
        name: 'straatbeeld',
        url: 'http://localhost:8080/#?mpb=topografie&mpz=11&mpo=pano::T&mpv=52.3730353:4.8932471&pgn=home&sbf=Cu' +
            '&sbh=aS&sbi=TMX7315120208-000073_pano_0005_000449&sbl=ZRWBl:3JJZP',
        rootElement: '.c-dashboard__body'
    }
];
