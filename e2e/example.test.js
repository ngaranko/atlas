const indexPage = require('./pages/index.js');

describe('Even lekker testen', function () {
    let homepage;

    beforeEach(function () {
        homepage = indexPage('http://localhost:8000');
    });

    it('sets the <title> element', function () {
        expect(homepage.title()).toBe('Home - Atlas');
    });

    it('shows the map (middle: 1/3) and home (right: 2/3)', function () {
        expect(homepage.dashboard().leftColumn().columnSize()).toBe(0);

        expect(homepage.dashboard().middleColumn().columnSize()).toBe(4);

        expect(homepage.dashboard().rightColumn().columnSize()).toBe(8);
    });
});
