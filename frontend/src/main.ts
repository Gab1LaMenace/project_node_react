// Import the bootstrapApplication function to initialize the Angular app.
import { bootstrapApplication } from '@angular/platform-browser';

// Import the root component of the application.
import { AppComponent } from './app/app.component';

// Import the provideRouter function to configure routing for the app.
import { provideRouter } from '@angular/router';

// Import the provideHttpClient function to enable HTTP client functionality for API calls.
import { provideHttpClient } from '@angular/common/http';

// Import the defined routes for the application.
import { routes } from './app/app.routes';

// Bootstraps the Angular application with the root component (AppComponent).
// This is the entry point of the application where Angular starts its lifecycle.
bootstrapApplication(AppComponent, {
  providers: [
    // Provide the router configuration for the application.
    provideRouter(routes),
    // Provide the HTTP client service for making API calls.
    provideHttpClient()
  ]
})
  // Catch and log any errors that occur during the bootstrap process.
  .catch(err => console.error(err));

