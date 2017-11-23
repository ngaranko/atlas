import ErrorMessageReducer, { resetErrorMessage } from './error-message';

let origRaven;

describe('The error message reducer', () => {
  beforeEach(() => {
    origRaven = global.Raven;
    global.Raven = {
      captureMessage: () => {}
    };
    jest.spyOn(global.Raven, 'captureMessage');
  });

  afterEach(() => {
    global.Raven = origRaven;
  });

  it('does nothing by default', () => {
    expect(ErrorMessageReducer({
      a: 1,
      error: { name: 'Name', message: 'Message' }
    }, {})).toEqual({
      a: 1,
      error: { name: 'Name', message: 'Message' }
    });
  });

  it('adds the error to the state', () => {
    expect(ErrorMessageReducer({
      a: 1,
      error: { name: 'Name', message: 'Message' }
    }, { error: { name: 'New name', message: 'New message' } }))
      .toEqual({
        a: 1,
        error: { name: 'New name', message: 'New message' }
      });
  });

  it('can reset the error message state', () => {
    expect(ErrorMessageReducer({
      a: 1,
      error: { name: 'Name', message: 'Message' }
    }, { type: 'RESET_ERROR_MESSAGE' }))
      .toEqual({
        a: 1,
        error: null
      });
  });

  it('exposes the resetErrorMessage action', () => {
    expect(resetErrorMessage()).toEqual({ type: 'RESET_ERROR_MESSAGE' });
  });
});
