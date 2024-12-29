// Import the Routes type from Angular's router module to define the application's routes.
import { Routes } from '@angular/router';

// Import the components that will be associated with different routes.
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { MusicComponent } from './music/music.component';
import { AdminComponent } from './admin/admin.component';

// Define the routes for the application.
// Each route specifies a path and the corresponding component to load.
export const routes: Routes = [
  // Redirect the root path ('') to the '/login' route.
  // The `pathMatch: 'full'` ensures the entire URL matches exactly.
  { path: '', redirectTo: '/login', pathMatch: 'full' },

  // Define the route for the admin panel, linking it to the AdminComponent.
  { path: 'admin', component: AdminComponent },

  // Define the route for the login page, linking it to the LoginComponent.
  { path: 'login', component: LoginComponent },

  // Define the route for the registration page, linking it to the RegisterComponent.
  { path: 'register', component: RegisterComponent },

  // Define the route for the music page, linking it to the MusicComponent.
  { path: 'music', component: MusicComponent },
];

