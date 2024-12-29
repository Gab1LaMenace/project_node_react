import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private accounts: { username: string; email: string; password: string; role: string }[] = [];

  constructor() {
    // Generate the default admin account and 20 dummy accounts when the service is initialized
    this.generateDummyAccounts();
  }

  private generateDummyAccounts() {
    // Add the default admin account first
    this.accounts.push({
      username: 'admin',
      email: 'admin@example.com',
      password: 'admin',
      role: 'admin',
    });

    // Add 20 accounts
    for (let i = 1; i <= 20; i++) {
      this.accounts.push({
        username: `user${i}`,
        email: `user${i}@example.com`,
        password: `password${i}`,
        role: 'user',
      });
    }
  }

  // Register a new user with a role (admin or user)
  registerAccount(account: { username: string; email: string; password: string; role: string }): string {
    const existingAccount = this.accounts.find(
      (acc) => acc.username === account.username || acc.email === account.email
    );
    if (existingAccount) {
      return 'Username or email already exists!';
    }
    this.accounts.push(account);
    return 'Account registered successfully!';
  }

  // Authenticate a user
  authenticate(username: string, password: string): { username: string; email: string; password: string; role: string } | null {
    return this.accounts.find(
      (acc) => acc.username === username && acc.password === password
    ) || null;
  }

  // Get all accounts (for admin view)
  getAccounts(): { username: string; email: string; password: string; role: string }[] {
    return this.accounts;
  }
}
