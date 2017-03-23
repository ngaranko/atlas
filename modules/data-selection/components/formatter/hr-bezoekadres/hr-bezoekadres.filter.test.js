describe('The hrBezoekadres filter', function () {
    let hrBezoekadresFilter,
        mockedUser,
        user;

    beforeEach(function () {
        angular.mock.module(
            'dpDataSelection',
            {
                'user': {
                    getStatus: function () {
                        return mockedUser.logged_in;
                    },
                    login: function () {
                        mockedUser.logged_in.isLoggedIn = true;
                    }
                }
            });

        mockedUser = {
            logged_in: {
                isLoggedIn: false
            }
        };

        angular.mock.inject(function (_hrBezoekadresFilter_, _user_) {
            hrBezoekadresFilter = _hrBezoekadresFilter_;
            user = _user_;
        });
    });

    it('returns bezoekadres when non mailing indication is false', function () {
        const input = {
            bezoekadres_volledig_adres: 'Weesperstraat 113, Amsterdam',
            non_mailing: false
        };
        const output = hrBezoekadresFilter(input);
        expect(output).toBe('Weesperstraat 113, Amsterdam');
    });

    it('Hides bezoekadres when non mailing is on and user is not logged in', function () {
        const input = {
            bezoekadres_volledig_adres: 'Weesperstraat 113, Amsterdam',
            non_mailing: true
        };
        const output = hrBezoekadresFilter(input);
        expect(output).toBe('Non-mailing-indicatie actief');
    });

    it('Shows bezoekadres when non mailing is on and user is logged in', function () {
        const input = {
            bezoekadres_volledig_adres: 'Weesperstraat 113, Amsterdam',
            non_mailing: true
        };
        // Setting user to logged in
        user.login();

        const output = hrBezoekadresFilter(input);
        expect(output).toBe('Weesperstraat 113, Amsterdam');
    });
});
