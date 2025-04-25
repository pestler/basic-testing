import axios, { AxiosInstance } from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('axios');
jest.mock('lodash', () => ({
  ...jest.requireActual('lodash'),
  throttle: jest.fn((fn) => fn),
}));

describe('throttledGetDataFromApi', () => {
  let mockAxiosClient: Partial<AxiosInstance>;

  beforeEach(() => {
    mockAxiosClient = {
      get: jest.fn(),
    };
    (axios.create as jest.Mock).mockReturnValue(mockAxiosClient);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('creates an Axios instance with the correct base URL', async () => {
    const relativePath = '/posts/1';
    const mockResponseData = { id: 1, title: 'Post Title' };

    mockAxiosClient.get = jest
      .fn()
      .mockResolvedValueOnce({ data: mockResponseData });

    await throttledGetDataFromApi(relativePath);

    expect(axios.create).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('sends a request to the correct endpoint', async () => {
    const relativePath = '/posts/1';
    const mockResponseData = { id: 1, title: 'Post Title' };

    mockAxiosClient.get = jest
      .fn()
      .mockResolvedValueOnce({ data: mockResponseData });

    await throttledGetDataFromApi(relativePath);

    expect(mockAxiosClient.get).toHaveBeenCalledWith(relativePath);
  });

  test('returns response data correctly', async () => {
    const relativePath = '/posts/1';
    const mockResponseData = { id: 1, title: 'Post Title' };

    mockAxiosClient.get = jest
      .fn()
      .mockResolvedValueOnce({ data: mockResponseData });

    const result = await throttledGetDataFromApi(relativePath);

    expect(result).toEqual(mockResponseData);
  });

  test('handles errors correctly', async () => {
    const relativePath = '/posts/1';
    const errorMessage = 'Network Error';

    mockAxiosClient.get = jest
      .fn()
      .mockRejectedValueOnce(new Error(errorMessage));

    await expect(throttledGetDataFromApi(relativePath)).rejects.toThrow(
      errorMessage,
    );
  });
});
