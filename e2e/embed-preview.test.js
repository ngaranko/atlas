describe('Embed preview', () => {
    let page,
        header;

    beforeEach(() => {
        page = dp.navigate('PAGE--HOME');
        header = page.dashboard.siteHeader;
    });

    it('op de homepage is geen embed button', () => {
        expect(header.menu.dropDownMain.itemCount).toBe(0);

        // toggle open main menu
        header.menu.dropDownMain.toggle();

        // no print or embed button
        expect(header.menu.dropDownMain.itemCount).toBe(1);
    });

    it('ga naar embedden', () => {
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
        expect(header.embedHeader.inputLink.value).toBe('http://localhost:8000/#?ate=T&lse=T&mpb=topografie&m' +
            'pz=11&mpfs=T&mpv=52.3731081:4.8932945&pgn=home');

        expect(header.embedHeader.inputHtml.label).toBe('HTML-code');
        expect(header.embedHeader.inputHtml.value).toBe('<iframe width="500" height="400" src="http://localho' +
            'st:8000/#?ate=T&lse=T&mpb=topografie&mpz=11&mpfs=T&mpv=52.3731081:4.8932945&pgn=home" frameborder="0">' +
            '</iframe>');
    });
});
