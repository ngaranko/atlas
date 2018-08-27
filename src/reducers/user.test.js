import reducer, {
  AUTHENTICATE_ERROR,
  AUTHENTICATE_USER,
  authenticateError,
  authenticateUser
} from './user';

const initialState = {
  authenticated: false,
  accessToken: '',
  name: '',
  scopes: [],
  error: false
};

describe('User Reducer', () => {
  it('should load the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it(`should set the user data when ${AUTHENTICATE_USER} is dispatched`, () => {
    expect(reducer(initialState, {
      type: AUTHENTICATE_USER,
      accessToken: 'token',
      name: 'name',
      scopes: ['scope']
    })).toEqual({
      authenticated: true,
      accessToken: 'token',
      name: 'name',
      scopes: ['scope'],
      error: false
    });
  });

  it(`should set error details when ${AUTHENTICATE_ERROR} is dispatched`, () => {
    expect(reducer(initialState, {
      type: AUTHENTICATE_ERROR
    })).toEqual({
      ...initialState,
      error: true
    });
  });
});

describe('authenticateUser method', () => {
  it('should return the right action', () => {
    expect(authenticateUser('123', 'name', ['scope'])).toEqual({
      type: AUTHENTICATE_USER,
      accessToken: '123',
      name: 'name',
      scopes: ['scope']
    });
  });
});

describe('authenticateError method', () => {
  it('should return the right action', () => {
    expect(authenticateError()).toEqual({
      type: AUTHENTICATE_ERROR
    });
  });
});
