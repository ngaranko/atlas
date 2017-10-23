describe('Embed preview', () => {
    let page,
        header,
        map;

    beforeEach(() => {
        page = dp.navigate('PAGE--HOME');
        header = page.dashboard.siteHeader;
        map = page.dashboard.middleColumn.map;
    });

    it('op de homepage is geen embed button', () => {
        expect(header.menu.dropDownMain.itemCount).toBe(0);

        // toggle open main menu
        header.menu.dropDownMain.toggle();

        // no print or embed button
        expect(header.menu.dropDownMain.itemCount).toBe(1);
    });

    it('ga naar full screen kaart en ga naar embed preview', () => {
        // Go to the Map
        page.dashboard.rightColumn.page.homepage.map.click();

        expect(page.title).toBe('Selecteer kaartlagen - Dataportaal');
        expect(header.menu.dropDownMain.itemCount).toBe(0);

        // toggle open main menu
        header.menu.dropDownMain.toggle();

        // print, embed and reporting button
        expect(header.menu.dropDownMain.itemCount).toBe(3);
        expect(header.menu.dropDownMain.items(1).text).toBe('Embedden');

        // go to embed preview
        header.menu.dropDownMain.items(1).click();

        expect(header.embedHeader.visible).toBeTruthy();

        expect(header.embedHeader.inputLink.label).toBe('Link');
        expect(header.embedHeader.inputLink.value).toBe('http://localhost:8080/#?ate=T&lse=T&mpb=topografie&m' +
            'pz=11&mpfs=T&mpv=52.3731081:4.8932945&pgn=home');

        expect(header.embedHeader.inputHtml.label).toBe('HTML-code');
        expect(header.embedHeader.inputHtml.value).toBe('<iframe width="500" height="400" src="http://localho' +
            'st:8080/#?ate=T&lse=T&mpb=topografie&mpz=11&mpfs=T&mpv=52.3731081:4.8932945&pgn=home" frameborder="0">' +
            '</iframe>');

        const link = 'http://localhost:8080/#?lse=T&mpb=topografie&mpz=11&mpfs=T&mpv=52.3731081:4.8932945&pgn=home';

        expect(map.embedButton.text).toBe('City Data');
        expect(map.embedButton.link).toBe(link);

        map.zoomIn();

        // It takes a long time for the new zoom level to be reflected in the link
        // 100 ms is not enough...
        browser.sleep(1000);

        // city data button should have adjusted link in preview
        expect(map.embedButton.link).not.toBe(link);
    });
});

it('Embed kaart', () => {
    const page = dp.navigate('PAGE--EMBED'),
        map = page.dashboard.middleColumn.map,
        link = 'http://localhost:8080/#?lse=T&mpb=topografie&mpz=11&mpfs=T&mpv=52.3731081:4.8932945&pgn=home';

    expect(map.embedButton.text).toBe('City Data');
    expect(map.embedButton.link).toBe(link);

    map.zoomIn();

    // It takes a long time for the new zoom level to be reflected in the link
    // 100 ms is not enough...
    browser.sleep(1000);

    // city data button should have adjusted link in embed map
    expect(map.embedButton.link).not.toBe(link);
});
