describe('Embed preview', () => {
    let page,
        header;

    beforeEach(() => {
        page = dp.navigate('PAGE--HOME');
        header = page.dashboard.siteHeader;
    });

    it('ga naar embedden', () => {
        // Go to the Map
        page.dashboard.rightColumn.page.homepage.map.click();

        expect(page.title).toBe('Selecteer kaartlagen - Dataportaal');

        expect(header.menu.dropDownMain.itemCount).toBe(0);

        header.menu.dropDownMain.toggle();

        expect(header.menu.dropDownMain.items(1).text).toBe('Embedden');

        expect(header.menu.dropDownMain.itemCount).toBe(3);

        header.menu.dropDownMain.items(1).click();

        dp.screenshot('yo.png');
    });
});
