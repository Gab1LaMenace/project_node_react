// Import required Angular modules and decorators
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-register', // Component selector to use in HTML templates
  templateUrl: './register.component.html', // Path to the HTML template
  styleUrls: ['./register.component.css'], // Path to the CSS file for styling
  standalone: true, // Marks the component as standalone (doesn't require a module)
  imports: [
    FormsModule, // Enables template-driven forms
    NgIf // Provides structural directives for conditional rendering
  ]
})
export class RegisterComponent {
  // Form fields for registration
  username: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';

  // Feedback messages for the user
  errorMessage: string = '';
  successMessage: string = '';

  // Static accounts list to simulate a shared state
  // This should ideally be managed by a service or a database
  static accounts: { username: string; email: string; password: string }[] = [];

  constructor(private router: Router) {}

  /**
   * Handles form submission.
   * @param event - The form submission event
   */
  onSubmit(event: Event): void {
    event.preventDefault(); // Prevents default form submission behavior

    // Validation: Check if an account with the same username or email exists
    const existingAccount = RegisterComponent.accounts.find(
      (account) => account.username === this.username || account.email === this.email
    );
    if (existingAccount) {
      // Display an error message if the username or email is already taken
      this.errorMessage = 'Username or email already exists!';
      return;
    }

    // Save the new account to the accounts list
    RegisterComponent.accounts.push({ username: this.username, email: this.email, password: this.password });

    // Provide success feedback to the user
    this.successMessage = 'Registration successful!';
    this.errorMessage = '';
  }
}
