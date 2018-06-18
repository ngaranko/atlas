import getEmbedLink from './embed';
import SHARED_CONFIG from '../../../shared/services/shared-config/shared-config';

// SELECTORS
describe('embed selectors', () => {
  const mockParameters = {
    ui: {
      isEmbedPreview: true,
      isEmbed: true
    }
  };
  global.location.hash = '#?atep=T&ate=T&mpb=topografie&mpz=11&mpfs=T&mpv=52.3731081:4.8932945&pgn=home';

  describe('getEmbedLink', () => {
    it('should return a generated string url without embed params "atep / ate"', () => {
      const selected = getEmbedLink.resultFunc(mockParameters.ui, mockParameters);
      expect(selected).toEqual(`${SHARED_CONFIG.ROOT}#?mpb=topografie&mpz=11&mpfs=T&mpv=52.3731081%3A4.8932945&pgn=home`);
    });

    it('should return empty string', () => {
      const ui = {
        isEmbedPreview: false,
        isEmbed: false
      };
      const selected = getEmbedLink.resultFunc(ui, mockParameters);
      expect(selected).toEqual('');
    });
  });
});
