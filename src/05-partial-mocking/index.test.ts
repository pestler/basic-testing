// Uncomment the code below and write your tests
import { noop } from 'lodash';
import { mockOne, mockThree, mockTwo, unmockedFunction } from './index';

jest.mock('./index', () => {
  const originalModule =
    jest.requireActual<typeof import('./index')>('./index');

  const mock = () => jest.fn(noop);

  return {
    __esModule: true,
    ...originalModule,
    mockOne: mock(),
    mockTwo: mock(),
    mockThree: mock(),
  };
});

describe('partial mocking', () => {
  afterAll(() => {
    jest.unmock('./index');
  });

  test('mockOne, mockTwo, mockThree should not log into console', () => {
    const logSpy = jest.spyOn(global.console, 'log');
    mockOne();
    mockTwo();
    mockThree();

    expect(logSpy).not.toHaveBeenCalled();

    logSpy.mockRestore();
  });

  test('unmockedFunction should log into console', () => {
    const logSpy = jest.spyOn(global.console, 'log');
    unmockedFunction();
    expect(logSpy).toHaveBeenCalledWith('I am not mocked');
    logSpy.mockRestore();
  });
});
