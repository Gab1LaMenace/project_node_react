import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [RouterOutlet],
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'music-app';
  constructor(private router: Router) {}
  // Method to navigate the user to the login page.
  goToLogin() {
    this.router.navigate(['/login']); // Navigates to the '/login' route.
  }
  // Method to navigate the user to the registration page.
  goToRegister() {
    this.router.navigate(['/register']); // Navigates to the '/register' route.
  }
}
