import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../services/account.service';
import {FormsModule} from '@angular/forms';
import {NgIf} from '@angular/common'; // Import AccountService

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  imports: [
    FormsModule,
    NgIf
  ]
})
export class RegisterComponent {
  username: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  role: string = 'user'; // Default role
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private router: Router, private accountService: AccountService) {}

  onSubmit(event: Event): void {
    event.preventDefault();

    // Check if all fields are filled
    if (!this.username || !this.email || !this.password || !this.confirmPassword) {
      this.errorMessage = 'All fields are required!';
      return;
    }

    // Check if password and confirm password match
    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match!';
      return;
    }

    // Check if the username or email already exists
    const existingAccount = this.accountService.getAccounts().find(
      (acc) => acc.username === this.username || acc.email === this.email
    );
    if (existingAccount) {
      this.errorMessage = 'Username or email already exists!';
      return;
    }

    const newAccount = {
      username: this.username,
      email: this.email,
      password: this.password,
      role: this.role,
    };

    const result = this.accountService.registerAccount(newAccount);
    if (result === 'Account registered successfully!') {
      this.successMessage = result;
    } else {
      this.errorMessage = result;
    }
  }
}

//here is our try to link with our sql database
/*
export class RegisterComponent {
  name: string = '';
  surname: string = '';
  username: string = '';
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit(event: Event): void {
    event.preventDefault();  // Prevent page reload on form submission

    const userData = {
      name: this.name,
      surname: this.surname,
      username: this.username,
      email: this.email,
      password: this.password,
    };

    this.http.post('http://localhost:3000/api/register', userData).subscribe({
      next: (response: any) => {
        if (response.success) {
          this.successMessage = 'Registration successful! Redirecting to login page...';
          setTimeout(() => {
            this.router.navigate(['/login']);  // Redirect to login after successful registration
          }, 2000);  // Delay to show success message before redirect
        } else {
          this.errorMessage = response.message || 'Something went wrong. Please try again.';
        }
      },
      error: (err) => {
        console.error('Registration error:', err);
        this.errorMessage = 'An error occurred. Please try again.';
      },
    });
  }

  goToLogin(): void {
    this.router.navigate(['/login']);
  }
}
*/
