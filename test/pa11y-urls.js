module.exports = [
    {
        // homepage
        url: 'http://localhost:8080/#?mpb=topografie&mpz=11&mpv=52.3731081:4.8932945&pgn=home'
    },
    {
        // adressenlijst
        url: 'http://localhost:8080/#?dsd=bag&dsp=1&dsv=TABLE&mpb=topografie&mpz=11&mpv=52.3731081:4.8932945',
        rootElement: '.c-dashboard__body'
    },
    {
        // straatbeeld
        url: 'http://localhost:8080/#?mpb=topografie&mpz=11&mpo=pano::T&mpv=52.3730353:4.8932471&pgn=home&sbf=Cu' +
            '&sbh=aS&sbi=TMX7315120208-000073_pano_0005_000449&sbl=ZRWBl:3JJZP',
        rootElement: '.c-dashboard__body'
    },
    {
        // kaart met 2 kaartlagen: meetbouten en kadastrale perceelgrenzen
        url: 'http://localhost:8080/#?lse=T&mpb=topografie&mpz=12&mpfs=T&mpo=bgem::T:kgem::T:ksec::T:kot::T:mbs::' +
            'T&mpv=52.3731147:4.8933883&pgn=home',
        rootElement: '.c-dashboard__body'
    },
    {
        // kaart met geo search
        url: 'http://localhost:8080/#?mpb=topografie&mpz=12&mpo=bgem::T:kgem::T:ksec::T:kot::T:mbs::T&mpv=52.3734' +
            '045:4.8922749&srl=ZRX9J:3JH2b',
        rootElement: '.c-dashboard__body'
    },
    {
        // kaart met adressenlijst en getekende ruimte
        url: 'http://localhost:8080/#?dsd=bag&dsgf=ZRcTb::3JDU2:ZRbBw::3JKwW:ZRZF8::3JFFi&dsgd=518,2%2520m%2520en' +
            '%252012.209,9%2520m%25C2%25B2&dsp=1&dsv=LIST&mpb=topografie&mpz=12&mpo=bgem::T:kgem::T:ksec::T:kot::' +
            'T:mbs::T&mpv=52.3734045:4.8922749&srl=ZRX9J:3JH2b',
        rootElement: '.c-dashboard__body'
    },
    {
        // adressenlijst met ingetekende ruimte en 1 filter
        url: 'http://localhost:8080/#?dsd=bag&dsgf=ZRcTb::3JDU2:ZRbBw::3JKwW:ZRZF8::3JFFi&dsgd=518,2%2520m%2520' +
            'en%252012.209,9%2520m%25C2%25B2&dsp=1&dsv=TABLE&dsf=openbare_ruimte::Blaeustraat&mpb=topografie&mp' +
            'z=12&mpo=bgem::T:kgem::T:ksec::T:kot::T:mbs::T&mpv=52.3734045:4.8922749&srl=ZRX9J:3JH2b',
        rootElement: '.c-dashboard__body'
    }
];
