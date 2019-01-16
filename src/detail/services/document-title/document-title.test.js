
import getTitle from './document-title';

describe('The Detail DocumentTitle service', () => {
  beforeEach(() => {
  });

  it('combines a GLOSSARY label with a specific display variable', () => {
    const mockedDetailState = {
      payload: {
        type: 'wkpb',
        subtype: 'beperking'
      }
    };
    expect(getTitle(mockedDetailState)).toBe('Gemeentelijke beperking');
  });

  it('falls back to glossary key when no definition can be found', () => {
    const mockedDetailState = {
      payload: {
        type: 'wkpb',
        subtype: 'unknown'
      }
    };
    expect(getTitle(mockedDetailState)).toBe('UNKNOWN');
  });

  it('falls back to glossary key when no definition can be found', () => {
    const mockedDetailState = {
      payload: {
        type: 'wkpb',
        subtype: 'unknown'
      }
    };
    expect(getTitle(mockedDetailState)).toBe('UNKNOWN');
  });
});
