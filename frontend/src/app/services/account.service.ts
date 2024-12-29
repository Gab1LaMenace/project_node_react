// Import Injectable decorator to make the service available for dependency injection.
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root', // Ensures the service is provided at the root level of the application.
})
export class AccountService {
  // Array to store account data (username, email, and password).
  private accounts: { username: string; email: string; password: string }[] = [];

  constructor() {}

  /**
   * Registers a new account.
   * @param account - An object containing username, email, and password.
   * @returns A success or error message based on the operation result.
   */
  registerAccount(account: { username: string; email: string; password: string }): string {
    // Check if the username or email already exists.
    const existingAccount = this.accounts.find(
      (acc) => acc.username === account.username || acc.email === account.email
    );
    if (existingAccount) {
      return 'Username or email already exists!'; // Error message for duplicate accounts.
    }
    // Add the new account to the list.
    this.accounts.push(account);
    return 'Account registered successfully!'; // Success message for registration.
  }

  /**
   * Authenticates a user by username and password.
   * @param username - The username of the account.
   * @param password - The password of the account.
   * @returns True if authentication is successful, otherwise false.
   */
  authenticate(username: string, password: string): boolean {
    // Check if an account exists with the given username and password.
    return this.accounts.some((acc) => acc.username === username && acc.password === password);
  }

  /**
   * Retrieves all registered accounts.
   * @returns An array of account objects.
   */
  getAccounts(): { username: string; email: string; password: string }[] {
    return this.accounts;
  }
}
