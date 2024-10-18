// Uncomment the code below and write your tests
import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';
import path from 'node:path';
import fs from 'node:fs';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should set timeout with provided callback and timeout', () => {
    const callback = jest.fn();
    const setTimeoutSpy = jest.spyOn(global, 'setTimeout');
    doStuffByTimeout(callback, 1000);
    expect(setTimeoutSpy).toHaveBeenCalledWith(callback, 1000);
  });

  test('should call callback only after timeout', () => {
    const callback = jest.fn();
    doStuffByTimeout(callback, 1000);
    jest.advanceTimersByTime(900);
    expect(callback).not.toHaveBeenCalledTimes(1);
    jest.advanceTimersByTime(300);
    expect(callback).toHaveBeenCalledTimes(1);
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const callback = jest.fn();
    const setTimeoutSpy = jest.spyOn(global, 'setInterval');
    doStuffByInterval(callback, 1000);
    expect(setTimeoutSpy).toHaveBeenCalledWith(callback, 1000);
    setTimeoutSpy.mockRestore();
  });

  test('should call callback multiple times after multiple intervals', () => {
    const callback = jest.fn();
    doStuffByInterval(callback, 2000);
    jest.advanceTimersByTime(1900);
    expect(callback).not.toHaveBeenCalledTimes(1);
    jest.advanceTimersByTime(500);
    expect(callback).toHaveBeenCalledTimes(1);
    jest.advanceTimersByTime(4000);
    expect(callback).toHaveBeenCalledTimes(3);
  });
});

describe('readFileAsynchronously', () => {
  const pathToFile = 'someFile.txt';
  test('should call join with pathToFile', async () => {
    const pathSpyOn = jest.spyOn(path, 'join');
    await readFileAsynchronously(pathToFile);
    expect(pathSpyOn).toHaveBeenCalledTimes(1);
    expect(pathSpyOn).toHaveBeenCalledWith(expect.any(String), pathToFile);
  });

  test('should return null if file does not exist', async () => {
    const pathToFile = 'someFile.txt';
    await expect(readFileAsynchronously(pathToFile)).resolves.toBeNull();
  });

  test('should return file content if file exists', async () => {
    const pathToFile = 'someFile.txt';
    const fileContent = 'fileContent';

    jest.spyOn(fs, 'existsSync').mockReturnValue(true);
    jest.spyOn(fs.promises, 'readFile').mockResolvedValue(fileContent);

    await expect(readFileAsynchronously(pathToFile)).resolves.toBe(fileContent);
  });
});
