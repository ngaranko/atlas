describe('The hrBezoekadres filter', function () {
    let hrBezoekadresFilter;

    beforeEach(function () {
        angular.mock.module('dpDataSelection');

        angular.mock.inject(function (_hrBezoekadresFilter_) {
            hrBezoekadresFilter = _hrBezoekadresFilter_;
        });
    });

    it('returns bezoekadres when non mailing indication is true', function () {
        const input = {
            bezoekadres_volledig_adres: 'Weesperstraat 113, Amsterdam',
            non_mailing: true
        };
        const output = hrBezoekadresFilter(input);
        expect(output).toBe('Weesperstraat 113, Amsterdam');
    });

    it('returns bezoekadres when non mailing indication is false', function () {
        const input = {
            bezoekadres_volledig_adres: 'Weesperstraat 113, Amsterdam',
            non_mailing: false
        };
        const output = hrBezoekadresFilter(input);
        expect(output).toBe('Weesperstraat 113, Amsterdam');
    });
});
