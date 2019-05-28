/**
 * @jest-environment jsdom-global
 */
import useMatomo from './useMatomo';
import matomoTracker from '../../shared/services/piwik-tracker/piwik-tracker';

jest.mock('../../shared/services/piwik-tracker/piwik-tracker');

describe('useMatomo', () => {
  describe('trackPageView', () => {
    it('should call matomoTracker with the right parameters', () => {
      const title = 'The title';
      const url = 'https://www.someurl.com/foo/bar';
      jsdom.reconfigure({ url });
      const { trackPageView } = useMatomo();

      trackPageView(title);
      expect(matomoTracker).toHaveBeenCalledWith([
        'trackPageView', title, url, null
      ], url, title);
    });
  });
});
