import {
  BankAccount,
  getBankAccount,
  InsufficientFundsError,
  TransferFailedError,
  SynchronizationFailedError,
} from '.';

const balance = 10000;
let account: BankAccount = getBankAccount(balance);
const accountOther: BankAccount = getBankAccount(0);

describe('BankAccount', () => {
  beforeEach(() => account);
  test('should create account with initial balance', () => {
    expect(getBankAccount(100).getBalance()).toBe(100);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const account = getBankAccount(balance);
    expect(() => account.withdraw(balance + 1)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    const accountOther: BankAccount = getBankAccount(10);
    expect(() => account.transfer(balance + 1, accountOther)).toThrow(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring to the same account', () => {
    expect(() => account.transfer(balance + 1, account)).toThrow(
      TransferFailedError,
    );
  });

  test('should deposit money', () => {
    account = getBankAccount(balance);
    account.deposit(400);
    expect(account.getBalance()).toBe(10400);
  });

  test('should withdraw money', () => {
    account = getBankAccount(balance);
    account.withdraw(5000);
    expect(account.getBalance()).toBe(5000);
  });

  test('should transfer money', () => {
    account = getBankAccount(balance);
    account.transfer(1000, accountOther);
    expect(account.getBalance()).toBe(9000);
    expect(accountOther.getBalance()).toBe(1000);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const spy = jest.spyOn(account, 'fetchBalance').mockResolvedValue(2000);

    const fetchedBalance: number | null = await account.fetchBalance();

    expect(fetchedBalance).not.toBeNull();
    expect(typeof fetchedBalance).toBe('number');
    expect(fetchedBalance).toBe(2000);

    spy.mockRestore();
  });

  test('should set new balance if fetchBalance returned number', async () => {
    jest.spyOn(account, 'fetchBalance').mockReturnValue(Promise.resolve(2000));

    await account.synchronizeBalance();
    expect(account.getBalance()).toBe(2000);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    jest.spyOn(account, 'fetchBalance').mockReturnValue(Promise.resolve(null));

    expect.assertions(1);

    await expect(account.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
  });
});
