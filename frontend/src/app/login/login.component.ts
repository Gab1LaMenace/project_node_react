import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterComponent } from '../register/register.component'; // Import RegisterComponent to access registered accounts
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Import FormsModule for ngModel

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [
    NgIf,
    FormsModule
  ]
})
export class LoginComponent {
  usernameOrEmail: string = ''; // Input for username or email
  password: string = ''; // Input for password
  errorMessage: string = ''; // To store error messages
  successMessage: string = ''; // To store success message

  constructor(private router: Router) {}

  onSubmit(event: Event): void {
    event.preventDefault(); // Prevent default form submission

    const trimmedUsernameOrEmail = this.usernameOrEmail.trim(); // Trim inputs to remove leading/trailing spaces
    const trimmedPassword = this.password.trim();

    // Check if the username/email exists among registered accounts
    const account = RegisterComponent.accounts.find(
      (account) =>
        account.username === trimmedUsernameOrEmail || account.email === trimmedUsernameOrEmail
    );

    if (!account) {
      this.errorMessage = 'Invalid username or email!'; // Set error message for invalid username/email
      this.successMessage = ''; // Clear any success message
      return;
    }

    // Check if the password is correct
    if (account.password !== trimmedPassword) {
      this.errorMessage = 'Incorrect password!'; // Set error message for incorrect password
      this.successMessage = ''; // Clear any success message
      return;
    }

    // Clear any messages on successful login
    this.errorMessage = '';
    this.successMessage = 'Login successful!';

    // Redirect to the music page after successful login
    this.router.navigate(['/music']);
  }
}
