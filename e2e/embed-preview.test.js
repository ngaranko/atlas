describe('Embed preview', () => {
    let page,
        header;

    beforeEach(() => {
        page = dp.navigate('PAGE--HOME');
        header = page.dashboard.siteHeader;
    });

    it('op de homepage is geen embed button', () => {
        expect(header.menu.dropDownMain.itemCount).toBe(0);

        header.menu.dropDownMain.toggle();

        // no print or embed button
        expect(header.menu.dropDownMain.itemCount).toBe(1);
    });

    fit('ga naar embedden', () => {
        // Go to the Map
        page.dashboard.rightColumn.page.homepage.map.click();

        expect(page.title).toBe('Selecteer kaartlagen - Dataportaal');
        expect(header.menu.dropDownMain.itemCount).toBe(0);

        header.menu.dropDownMain.toggle();
        expect(header.menu.dropDownMain.itemCount).toBe(3);

        expect(header.menu.dropDownMain.items(1).text).toBe('Embedden');

        // go to embed preview
        header.menu.dropDownMain.items(1).click();

        // expect(header.embedHeader.inputLink.label).toBe('Link');
        // expect(header.embedHeader.inputLink.value).toBe('foo');
        // expect(header.embedHeader.inputHtml.label).toBe('Link');
        // expect(header.embedHeader.inputHtml.value).toBe('bar');

        // console.log('link', header.embedHeader.inputLink);

        dp.screenshot('yo.png');
    });
});
